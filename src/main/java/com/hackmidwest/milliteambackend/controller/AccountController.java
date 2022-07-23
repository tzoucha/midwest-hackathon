/*
 * Copyright(c)2001-2020 First National Bank of Omaha 1620 Dodge Street Omaha, NE 68197, USA All
 * rights reserved.
 *
 * <p>This software is the confidential and proprietary information of First National Bank
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement you entered into with First
 * National Bank
 */
package com.hackmidwest.milliteambackend.controller;

import com.hackmidwest.milliteambackend.model.Account;
import com.hackmidwest.milliteambackend.service.AccountService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/accounts")
public class AccountController {
  public AccountService accountService;

  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  @GetMapping("/{customerId}")
  public ResponseEntity<List<Account>> findAccountsForCustomer(String customerId){
    return ResponseEntity.ok(accountService.findAccountsForCustomer(customerId));
  }

  @PostMapping()
  public ResponseEntity<Account> createAccount(@RequestBody Account account){
    return ResponseEntity.ok(accountService.createAccount(account));
  }
}
