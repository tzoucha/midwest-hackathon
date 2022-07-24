/*
 * Copyright(c)2001-2020 First National Bank of Omaha 1620 Dodge Street Omaha, NE 68197, USA All
 * rights reserved.
 *
 * <p>This software is the confidential and proprietary information of First National Bank
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement you entered into with First
 * National Bank
 */
package com.hackmidwest.milliteambackend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Transaction {
  public String id;
  public BigDecimal amount;
  public String fromAccountId;
  public String toAccountId;
  public String description;
  public LocalDateTime transactionDateTime;
  public String executingCustomerId;
  public String name;
  public String profilePicture;

  public String getId() {
    return id;
  }

  public Transaction setId(String id) {
    this.id = id;
    return this;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public Transaction setAmount(BigDecimal amount) {
    this.amount = amount;
    return this;
  }

  public String getFromAccountId() {
    return fromAccountId;
  }

  public Transaction setFromAccountId(String fromAccountId) {
    this.fromAccountId = fromAccountId;
    return this;
  }

  public String getToAccountId() {
    return toAccountId;
  }

  public Transaction setToAccountId(String toAccountId) {
    this.toAccountId = toAccountId;
    return this;
  }

  public String getDescription() {
    return description;
  }

  public Transaction setDescription(String description) {
    this.description = description;
    return this;
  }

  public LocalDateTime getTransactionDateTime() {
    return transactionDateTime;
  }

  public Transaction setTransactionDateTime(LocalDateTime transactionDateTime) {
    this.transactionDateTime = transactionDateTime;
    return this;
  }

  public String getExecutingCustomerId() {
    return executingCustomerId;
  }

  public Transaction setExecutingCustomerId(String executingCustomerId) {
    this.executingCustomerId = executingCustomerId;
    return this;
  }

  public String getName() {
    return name;
  }

  public Transaction setName(String name) {
    this.name = name;
    return this;
  }

  public String getProfilePicture() {
    return profilePicture;
  }

  public Transaction setProfilePicture(String profilePicture) {
    this.profilePicture = profilePicture;
    return this;
  }
}
