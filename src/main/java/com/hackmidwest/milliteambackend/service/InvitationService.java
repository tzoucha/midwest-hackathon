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

import com.hackmidwest.milliteambackend.model.Account;
import com.hackmidwest.milliteambackend.model.Customer;
import com.hackmidwest.milliteambackend.model.Invitation;
import com.hackmidwest.milliteambackend.repo.AccountRepository;
import com.hackmidwest.milliteambackend.repo.CustomerRepository;
import com.hackmidwest.milliteambackend.repo.InvitationRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class InvitationService {
  private InvitationRepository invitationRepository;
  private CustomerRepository customerRepository;
  private AccountRepository accountRepository;

  public InvitationService(
      InvitationRepository invitationRepository,
      CustomerRepository customerRepository,
      AccountRepository accountRepository) {
    this.invitationRepository = invitationRepository;
    this.customerRepository = customerRepository;
    this.accountRepository = accountRepository;
  }

  public List<Invitation> getInvitationsForCustomerAndType(String customerId, String type){
    return invitationRepository.findByToCustomerIdAndType(customerId, type);
  }

  public Invitation createFriendInvitation(String toCustomer, String fromCustomer){
    Invitation invitation = new Invitation();
    invitation.setToCustomerId(toCustomer)
        .setFromId(fromCustomer)
        .setSentDateTime(LocalDateTime.now())
        .setType("FRIEND");
    return invitationRepository.save(invitation);
  }

  public Invitation createAccountInvitation(String toCustomer, String accountId){
    Invitation invitation = new Invitation();
    invitation.setToCustomerId(toCustomer)
        .setFromId(accountId)
        .setSentDateTime(LocalDateTime.now())
        .setType("ACCOUNT");
    return invitationRepository.save(invitation);
  }

  public void deleteInvitation(String id){
    invitationRepository.deleteById(id);
  }

  public void acceptInvitation(String id){
    Invitation invitation = invitationRepository.findById(id).get();
    if(invitation.getType().equalsIgnoreCase("FRIEND")){
      Customer customer = customerRepository.findById(invitation.getToCustomerId()).get();
      addFriendToCustomer(customer, invitation.getFromId());
      customer = customerRepository.findById(invitation.getFromId()).get();
      addFriendToCustomer(customer, invitation.getToCustomerId());
    } else {
      Account account = accountRepository.findById(invitation.getFromId()).get();
      account.getCustomerIds().add(invitation.getToCustomerId());
      accountRepository.save(account);
    }
    invitationRepository.delete(invitation);
  }

  private void addFriendToCustomer(Customer customer, String friendCustomerId){
    if(customer.getFriendCustomerIds() == null){
      customer.setFriendCustomerIds(new ArrayList<>());
    }
    customer.getFriendCustomerIds().add(friendCustomerId);
    customerRepository.save(customer);
  }

  public void dropAllInvitations(){
    invitationRepository.deleteAll();
  }
}
