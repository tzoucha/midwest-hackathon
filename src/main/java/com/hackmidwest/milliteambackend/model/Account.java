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
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import org.springframework.data.annotation.Id;

public class Account {
  @Id
  public String id;
  public List<String> customerIds;
  public BigDecimal balance;
  public String type;
  public String primaryOwnerCustomerId;
  public String description;
  public String picture;
  public BigDecimal goal;
  public LocalDate startDate;
  public LocalDate endDate;
  public String title;
  public String color;

  public String getId() {
    return id;
  }

  public Account setId(String id) {
    this.id = id;
    return this;
  }

  public List<String> getCustomerIds() {
    return customerIds;
  }

  public Account setCustomerIds(List<String> customerIds) {
    this.customerIds = customerIds;
    return this;
  }

  public BigDecimal getBalance() {
    return balance;
  }

  public Account setBalance(BigDecimal balance) {
    this.balance = balance;
    return this;
  }

  public String getType() {
    return type;
  }

  public Account setType(String type) {
    this.type = type;
    return this;
  }

  public String getPrimaryOwnerCustomerId() {
    return primaryOwnerCustomerId;
  }

  public Account setPrimaryOwnerCustomerId(String primaryOwnerCustomerId) {
    this.primaryOwnerCustomerId = primaryOwnerCustomerId;
    return this;
  }

  public String getDescription() {
    return description;
  }

  public Account setDescription(String description) {
    this.description = description;
    return this;
  }

  public String getPicture() {
    return picture;
  }

  public Account setPicture(String picture) {
    this.picture = picture;
    return this;
  }

  public BigDecimal getGoal() {
    return goal;
  }

  public Account setGoal(BigDecimal goal) {
    this.goal = goal;
    return this;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public Account setStartDate(LocalDate startDate) {
    this.startDate = startDate;
    return this;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public Account setEndDate(LocalDate endDate) {
    this.endDate = endDate;
    return this;
  }

  public String getTitle() {
    return title;
  }

  public Account setTitle(String title) {
    this.title = title;
    return this;
  }

  public String getColor() {
    return color;
  }

  public Account setColor(String color) {
    this.color = color;
    return this;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Account account = (Account) o;
    return Objects.equals(id, account.id) &&
        Objects.equals(customerIds, account.customerIds) &&
        Objects.equals(balance, account.balance) &&
        Objects.equals(type, account.type) &&
        Objects.equals(primaryOwnerCustomerId, account.primaryOwnerCustomerId) &&
        Objects.equals(description, account.description) &&
        Objects.equals(picture, account.picture) &&
        Objects.equals(goal, account.goal) &&
        Objects.equals(startDate, account.startDate) &&
        Objects.equals(endDate, account.endDate) &&
        Objects.equals(title, account.title) &&
        Objects.equals(color, account.color);
  }

  @Override
  public int hashCode() {
    return Objects
        .hash(id, customerIds, balance, type, primaryOwnerCustomerId, description, picture, goal,
            startDate, endDate, title, color);
  }
}
