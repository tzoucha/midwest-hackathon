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

import com.hackmidwest.milliteambackend.model.Transaction;
import com.hackmidwest.milliteambackend.service.TransactionService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transactions")
@CrossOrigin
public class TransactionController {
  public TransactionService transactionService;

  public TransactionController(
      TransactionService transactionService) {
    this.transactionService = transactionService;
  }

  @GetMapping("/{accountId}")
  public ResponseEntity<List<Transaction>> getTransactionsForAccount(@PathVariable String accountId){
    return ResponseEntity.ok(transactionService.getTransactionsForAccount(accountId));
  }

  @PostMapping
  public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction){
    return ResponseEntity.ok(transactionService.createTransaction(transaction));
  }

}
