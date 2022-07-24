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
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class TelnyxService {
  private CustomerRepository customerRepository;

  WebClient messagesApi = WebClient.builder()
      .baseUrl("https://api.telnyx.com/v2/messages").build();

  public TelnyxService(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  public void sendHelpMessage(String customerId, String phoneNumber){
    Customer customer = customerRepository.findById(customerId).get();
    String message = "Pocket Change customer " + customer.getFirstName() + " " + customer.getLastName() + " is requesting assistance. Contact them at: " + customer.getPhoneNumber() + ".";

    Map<String,Object> body = new HashMap<>();
    body.put("from", "+16182609042");
    body.put("to", phoneNumber);
    body.put("text", message);
    body.put("media_urls", new ArrayList<>());

    String resp = messagesApi.post()
        .header("Content-Type", "application/json")
        .header("Accept", "application/json")
        .header("Authorization", "Bearer KEY01822F0DB5835CEA79F606AEC92DAE96_CgnG5VAc3WtrJf1p2r7SGA")
        .body(BodyInserters.fromValue(body)).retrieve().bodyToMono(String.class).doOnError(r -> r.printStackTrace()).block();
  }

}
