package com.hackmidwest.milliteambackend.model;

import java.util.ArrayList;
import java.util.Date;
public class PinataUploadResponse {
  public int status;
  public ArrayList<Item> items;
  public Item item;
  public static class Item {
    public String id;
    public Date createdAt;
    public String cid;
    public String name;
    public String originalname;
    public String size;
    public Metadata metadata;
    public String type;
    public boolean pinToIPFS;
    public String uri;

    public String getId() {
      return id;
    }

    public Item setId(String id) {
      this.id = id;
      return this;
    }

    public Date getCreatedAt() {
      return createdAt;
    }

    public Item setCreatedAt(Date createdAt) {
      this.createdAt = createdAt;
      return this;
    }

    public String getCid() {
      return cid;
    }

    public Item setCid(String cid) {
      this.cid = cid;
      return this;
    }

    public String getName() {
      return name;
    }

    public Item setName(String name) {
      this.name = name;
      return this;
    }

    public String getOriginalname() {
      return originalname;
    }

    public Item setOriginalname(String originalname) {
      this.originalname = originalname;
      return this;
    }

    public String getSize() {
      return size;
    }

    public Item setSize(String size) {
      this.size = size;
      return this;
    }

    public Metadata getMetadata() {
      return metadata;
    }

    public Item setMetadata(
        Metadata metadata) {
      this.metadata = metadata;
      return this;
    }

    public String getType() {
      return type;
    }

    public Item setType(String type) {
      this.type = type;
      return this;
    }

    public boolean isPinToIPFS() {
      return pinToIPFS;
    }

    public Item setPinToIPFS(boolean pinToIPFS) {
      this.pinToIPFS = pinToIPFS;
      return this;
    }

    public String getUri() {
      return uri;
    }

    public Item setUri(String uri) {
      this.uri = uri;
      return this;
    }

    public static class KeyValues {
      public String example;
    }
    public static class Metadata {
      public KeyValues keyvalues;
    }
  }
}
