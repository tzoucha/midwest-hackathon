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

import java.util.List;
import org.springframework.data.mongodb.core.mapping.MongoId;

public class Customer {
  @MongoId
  public String _id;
  public String firstName;
  public String lastName;
  public String password;
  public String profilePicture;
  public String emailAddress;
  public String addressLine1;
  public String city;
  public String state;
  public String zipCode;
  public String phoneNumber;
  public List<String> friendCustomerIds;

  public String getId() {
    return _id;
  }

  public Customer setId(String id) {
    this._id = id;
    return this;
  }

  public String getFirstName() {
    return firstName;
  }

  public Customer setFirstName(String firstName) {
    this.firstName = firstName;
    return this;
  }

  public String getLastName() {
    return lastName;
  }

  public Customer setLastName(String lastName) {
    this.lastName = lastName;
    return this;
  }

  public String getPassword() {
    return password;
  }

  public Customer setPassword(String password) {
    this.password = password;
    return this;
  }

  public String getProfilePicture() {
    return profilePicture;
  }

  public Customer setProfilePicture(String profilePicture) {
    this.profilePicture = profilePicture;
    return this;
  }

  public String getEmailAddress() {
    return emailAddress;
  }

  public Customer setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
    return this;
  }

  public String getAddressLine1() {
    return addressLine1;
  }

  public Customer setAddressLine1(String addressLine1) {
    this.addressLine1 = addressLine1;
    return this;
  }

  public String getCity() {
    return city;
  }

  public Customer setCity(String city) {
    this.city = city;
    return this;
  }

  public String getState() {
    return state;
  }

  public Customer setState(String state) {
    this.state = state;
    return this;
  }

  public String getZipCode() {
    return zipCode;
  }

  public Customer setZipCode(String zipCode) {
    this.zipCode = zipCode;
    return this;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public Customer setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
    return this;
  }

  public List<String> getFriendCustomerIds() {
    return friendCustomerIds;
  }

  public Customer setFriendCustomerIds(List<String> friendCustomerIds) {
    this.friendCustomerIds = friendCustomerIds;
    return this;
  }
}
