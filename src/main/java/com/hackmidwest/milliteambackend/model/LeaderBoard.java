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
import java.util.List;

public class LeaderBoard {
  public BigDecimal balance;
  public List<Contributor> contributors;

  public BigDecimal getBalance() {
    return balance;
  }

  public LeaderBoard setBalance(BigDecimal balance) {
    this.balance = balance;
    return this;
  }

  public List<Contributor> getContributors() {
    return contributors;
  }

  public LeaderBoard setContributors(
      List<Contributor> contributors) {
    this.contributors = contributors;
    return this;
  }
}
