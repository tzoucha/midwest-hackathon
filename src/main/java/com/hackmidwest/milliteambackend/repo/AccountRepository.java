package com.hackmidwest.milliteambackend.repo;/*
 * Copyright(c)2001-2020 First National Bank of Omaha 1620 Dodge Street Omaha, NE 68197, USA All
 * rights reserved.
 *
 * <p>This software is the confidential and proprietary information of First National Bank
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement you entered into with First
 * National Bank
 */

import com.hackmidwest.milliteambackend.model.Account;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AccountRepository extends MongoRepository<Account, String> {

  List<Account> findByCustomerIds(String customerId);
  List<Account> findByPrimaryOwnerCustomerId(String primaryOwnerCustomerId);

}
