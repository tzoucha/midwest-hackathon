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
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
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

  public void closeAccount(String accountId){
    accountRepository.deleteById(accountId);
  }

  public Account createOrUpdateAccount(Account account){
    return accountRepository.save(account);
  }
}
