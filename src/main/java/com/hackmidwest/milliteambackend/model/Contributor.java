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

public class Contributor {
  public String name;
  public String profilePicture;
  public BigDecimal contribution;

  public String getName() {
    return name;
  }

  public Contributor setName(String name) {
    this.name = name;
    return this;
  }

  public String getProfilePicture() {
    return profilePicture;
  }

  public Contributor setProfilePicture(String profilePicture) {
    this.profilePicture = profilePicture;
    return this;
  }

  public BigDecimal getContribution() {
    return contribution;
  }

  public Contributor setContribution(BigDecimal contribution) {
    this.contribution = contribution;
    return this;
  }
}
