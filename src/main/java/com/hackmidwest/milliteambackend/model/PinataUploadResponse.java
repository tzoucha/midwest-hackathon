package com.hackmidwest.milliteambackend.model;

import java.util.ArrayList;
import java.util.Date;
public class PinataUploadResponse {
  public int status;
  public ArrayList<Item> items;
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
    public static class KeyValues {
      public String example;
    }
    public static class Metadata {
      public KeyValues keyvalues;
    }
  }
}
