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

import com.hackmidwest.milliteambackend.model.Customer;
import com.hackmidwest.milliteambackend.service.CustomerService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
@CrossOrigin
public class CustomerController {
  private CustomerService customerService;

  public CustomerController(CustomerService customerService) {
    this.customerService = customerService;
  }

  @GetMapping
  public ResponseEntity<List<Customer>> getAllCustomers(){
    return ResponseEntity.ok(customerService.getAllCustomers());
  }

  @PostMapping
  public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer){
    return ResponseEntity.ok(customerService.createOrUpdateCustomer(customer));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer){
    return ResponseEntity.ok(customerService.createOrUpdateCustomer(customer));
  }

  @PostMapping("/login")
  public ResponseEntity<Customer> login(@RequestBody Customer customer){
    Customer returnedCustomer = customerService.login(customer);
    return returnedCustomer == null? ResponseEntity.status(HttpStatus.NOT_FOUND).body(null) : ResponseEntity.ok(returnedCustomer);
  }

  @DeleteMapping("/{customerId}/friends/{friendCustomerId}")
  public ResponseEntity<Customer> removeFriend(@PathVariable String customerId, @PathVariable String friendCustomerId){
    customerService.removeFriend(customerId, friendCustomerId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
  }

}
