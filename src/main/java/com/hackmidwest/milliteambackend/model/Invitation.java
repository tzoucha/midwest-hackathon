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

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;

public class Invitation {
  @Id
  public String id;
  public String toCustomerId;
  public String fromId;
  public String type;
  public LocalDateTime sentDateTime;

  public String getId() {
    return id;
  }

  public Invitation setId(String id) {
    this.id = id;
    return this;
  }

  public String getToCustomerId() {
    return toCustomerId;
  }

  public Invitation setToCustomerId(String toCustomerId) {
    this.toCustomerId = toCustomerId;
    return this;
  }

  public String getFromId() {
    return fromId;
  }

  public Invitation setFromId(String fromId) {
    this.fromId = fromId;
    return this;
  }

  public String getType() {
    return type;
  }

  public Invitation setType(String type) {
    this.type = type;
    return this;
  }

  public LocalDateTime getSentDateTime() {
    return sentDateTime;
  }

  public Invitation setSentDateTime(LocalDateTime sentDateTime) {
    this.sentDateTime = sentDateTime;
    return this;
  }
}
