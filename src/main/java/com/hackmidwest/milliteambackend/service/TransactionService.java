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

import com.hackmidwest.milliteambackend.model.Transaction;
import com.hackmidwest.milliteambackend.repo.TransactionRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
  TransactionRepository transactionRepository;

  public TransactionService(
      TransactionRepository transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public List<Transaction> getTransactionsForAccount(String accountId){
    List<Transaction> ret = new ArrayList<>();
    ret.addAll(transactionRepository.findByFromAccountId(accountId));
    ret.addAll(transactionRepository.findByToAccountId(accountId));
    return ret;
  }

  public Transaction createTransaction(Transaction transaction){
    return transactionRepository.save(transaction);
  }
}
