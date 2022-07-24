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

import com.hackmidwest.milliteambackend.model.Customer;
import com.hackmidwest.milliteambackend.repo.CustomerRepository;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

  private CustomerRepository customerRepository;

  @Autowired
  private MongoTemplate mongoTemplate;

  public List<Customer> fullTextSearch(String searchPhrase) {
    TextCriteria criteria = TextCriteria
            .forDefaultLanguage()
            .matchingPhrase(searchPhrase);

    Query query = TextQuery.queryText(criteria).sortByScore();

    List<Customer> customers = mongoTemplate.find(query, Customer.class);

    return customers;
  }

  public CustomerService(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  public List<Customer> getAllCustomers(){
    return customerRepository.findAll();
  }

  public Optional<Customer> getCustomerById(String customerId){
    return customerRepository.findById(customerId);
  }

  public Customer createOrUpdateCustomer(Customer customer, boolean create){
    customer.setPassword("milli123");
    if (create) {
      customer.setProfilePicture("6beb987b-5164-4112-ade0-3fbc49abf78e");
    }
    return customerRepository.save(customer);
  }

  public Customer login(Customer customer){
    return customerRepository.findByEmailAddressAndPassword(customer.getEmailAddress(), customer.getPassword());
  }

  public void removeFriend(String customerId, String friendCustomerId){
    excuteFriendRemoval(customerId, friendCustomerId);
    excuteFriendRemoval(friendCustomerId, customerId);
  }

  public void dropAllCustomers(){
    customerRepository.deleteAll();
  }

  private void excuteFriendRemoval(String friendOne, String friendTwo){
    Customer customer = customerRepository.findById(friendOne).get();
    customer.getFriendCustomerIds().remove(friendTwo);
    customerRepository.save(customer);
  }
}
