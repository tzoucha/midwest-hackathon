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
import com.hackmidwest.milliteambackend.repo.AccountRepository;
import java.util.HashSet;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

  public AccountRepository accountRepository;

  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  public Set<Account> findAccountsForCustomer(String customerId){
    Set<Account> ret = new HashSet<>();
    ret.addAll(accountRepository.findByCustomerIds(customerId));
    ret.addAll(accountRepository.findByPrimaryOwnerCustomerId(customerId));
    return ret;
  }

  public Account findAccountByAccountId(String accountId){
    return accountRepository.findById(accountId).get();
  }

  public void closeAccount(String accountId){
    accountRepository.deleteById(accountId);
  }

  public Account createOrUpdateAccount(Account account, boolean create){
    if (create) {
      account.setPicture("88bc65c0-e4a8-44f3-8cbd-32082bb5655d");
    }
    return accountRepository.save(account);
  }

  public void dropAllAccounts(){
    accountRepository.deleteAll();
  }
}
