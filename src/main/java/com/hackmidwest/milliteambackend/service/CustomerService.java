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
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

  private CustomerRepository customerRepository;

  public CustomerService(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  public List<Customer> getAllCustomers(){
    return customerRepository.findAll();
  }

  public Customer createOrUpdateCustomer(Customer customer){
    customer.setProfilePicture("bafkreicn32rxxi4dvyahj5dleuywisddraxnqk3s3myqgrpxia7uuuw2ey");
    return customerRepository.save(customer);
  }

  public Customer login(Customer customer){
    return customerRepository.findByEmailAddressAndPassword(customer.getEmailAddress(), customer.getPassword());
  }
}
