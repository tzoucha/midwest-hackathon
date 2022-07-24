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

import com.hackmidwest.milliteambackend.service.TelnyxService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/telnyx")
@CrossOrigin
public class TelnyxController {

  private TelnyxService telnyxService;

  public TelnyxController(TelnyxService telnyxService) {
    this.telnyxService = telnyxService;
  }

  @PostMapping("/{customerId}")
  public void sendHelpMessage(@PathVariable String customerId){
    telnyxService.sendHelpMessage(customerId, "+15317774149");
    telnyxService.sendHelpMessage(customerId, "+14026610470");
  }

}
