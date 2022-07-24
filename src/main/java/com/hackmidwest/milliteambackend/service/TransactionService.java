/*
 * Copyright(c)2001-2020 First National Bank of Omaha 1620 Dodge Street Omaha, NE 68197, USA All
 * rights reserved.
 *
 * <p>This software is the confidential and proprietary information of First National Bank
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement you entered into with First
 * National Bank
 */
package com.hackmidwest.milliteambackend.service;

import com.hackmidwest.milliteambackend.model.Account;
import com.hackmidwest.milliteambackend.model.Contributor;
import com.hackmidwest.milliteambackend.model.Customer;
import com.hackmidwest.milliteambackend.model.LeaderBoard;
import com.hackmidwest.milliteambackend.model.Transaction;
import com.hackmidwest.milliteambackend.repo.AccountRepository;
import com.hackmidwest.milliteambackend.repo.CustomerRepository;
import com.hackmidwest.milliteambackend.repo.TransactionRepository;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
  public TransactionRepository transactionRepository;
  public AccountRepository accountRepository;
  public CustomerRepository customerRepository;

  public TransactionService(
      TransactionRepository transactionRepository,
      AccountRepository accountRepository,
      CustomerRepository customerRepository) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
    this.customerRepository = customerRepository;
  }

  public List<Transaction> getTransactionsForAccount(String accountId){
    List<Transaction> ret = new ArrayList<>();
    ret.addAll(transactionRepository.findByFromAccountId(accountId));
    ret.addAll(transactionRepository.findByToAccountId(accountId));

    ret.forEach(transaction -> {
      Customer customer = customerRepository.findById(transaction.getExecutingCustomerId()).get();
      transaction.setName(customer.firstName + " " + customer.lastName);
      transaction.setProfilePicture(customer.getProfilePicture());
    });

    return ret;
  }

  public Transaction createTransaction(Transaction transaction){
    if(accountRepository.findById(transaction.getFromAccountId()).isPresent()) {
      Account fromAccount = accountRepository.findById(transaction.getFromAccountId()).get();
      fromAccount.setBalance(fromAccount.getBalance().subtract(transaction.getAmount()));
      accountRepository.save(fromAccount);
    }

    if(accountRepository.findById(transaction.getToAccountId()).isPresent()){
      Account toAccount = accountRepository.findById(transaction.getToAccountId()).get();
      toAccount.setBalance(toAccount.getBalance().add(transaction.getAmount()));
      accountRepository.save(toAccount);
    }

    return transactionRepository.save(transaction);
  }

  public LeaderBoard generateAccountLeaderboard(String accountId){
    List<Transaction> transactions = new ArrayList<>();
    transactions.addAll(transactionRepository.findByFromAccountId(accountId));
    transactions.addAll(transactionRepository.findByToAccountId(accountId));

    Account account = accountRepository.findById(accountId).get();

    Map<String, BigDecimal> customerIdToContribution = new HashMap<>();

    LeaderBoard ret = new LeaderBoard();
    ret.setBalance(account.getBalance());
    transactions.forEach(transaction -> {
      if(!customerIdToContribution.containsKey(transaction.getExecutingCustomerId())){
        customerIdToContribution.put(transaction.executingCustomerId, BigDecimal.ZERO);
      }
      customerIdToContribution.put(transaction.executingCustomerId, customerIdToContribution.get(transaction.getExecutingCustomerId()).add(transaction.getAmount()));
    });

    Set<String> participants = new HashSet<>();
    participants.add(account.getPrimaryOwnerCustomerId());
    participants.addAll(account.getCustomerIds());

    List<Contributor> contributors = new ArrayList<>();
    participants.forEach(participantId -> {
      Customer customer = customerRepository.findById(participantId).get();

      Contributor contributor = new Contributor();
      contributor.setName(customer.getFirstName() + " " + customer.getLastName());
      contributor.setProfilePicture(customer.getProfilePicture());
      contributor.setContribution(BigDecimal.ZERO);

      if(customerIdToContribution.containsKey(participantId)){
        contributor.setContribution(customerIdToContribution.get(participantId));
      }
      contributors.add(contributor);
    });
    ret.setContributors(contributors);
    return ret;
  }

  public void dropAllTransactions(){
    transactionRepository.deleteAll();
  }
}
