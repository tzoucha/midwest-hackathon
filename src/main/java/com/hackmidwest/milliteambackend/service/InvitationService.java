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

import com.hackmidwest.milliteambackend.model.Invitation;
import com.hackmidwest.milliteambackend.repo.InvitationRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class InvitationService {
  InvitationRepository invitationRepository;

  public InvitationService(InvitationRepository invitationRepository) {
    this.invitationRepository = invitationRepository;
  }

  public List<Invitation> getInvitationsForCustomerAndType(String customerId, String type){
    return invitationRepository.findByToCustomerIdAndType(customerId, type);
  }

  public Invitation createInvitation(Invitation invitation){
    return invitationRepository.save(invitation);
  }
}
