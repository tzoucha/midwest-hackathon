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

import com.hackmidwest.milliteambackend.model.Invitation;
import com.hackmidwest.milliteambackend.service.InvitationService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invitations")
@CrossOrigin
public class InvitationController {
  InvitationService invitationService;

  public InvitationController(InvitationService invitationService) {
    this.invitationService = invitationService;
  }

  @GetMapping("/{customerId}/{type}")
  public ResponseEntity<List<Invitation>> getInvitationsForCustomerByType(@PathVariable String customerId,@PathVariable String type){
    return ResponseEntity.ok(invitationService.getInvitationsForCustomerAndType(customerId, type));
  }

  @PostMapping
  public ResponseEntity<Invitation> createInvitation(@RequestBody Invitation invitation){
    return ResponseEntity.ok(invitationService.createInvitation(invitation));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Invitation> deleteInvitation(@PathVariable String id){
    invitationService.deleteInvitation(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
  }

  @PostMapping("/{id}")
  public ResponseEntity<Invitation> acceptInvitation(@PathVariable String id){
    return ResponseEntity.status(HttpStatus.OK).body(null);
  }
}
