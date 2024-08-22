package com.vetez.crm.model;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class Notice {
    private String ownerName;
    private String ownerId;
    private String description;
    private String mobileNumber;
    private String date;
    private String image;
}
