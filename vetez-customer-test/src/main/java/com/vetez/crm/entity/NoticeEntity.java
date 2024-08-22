package com.vetez.crm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.xml.namespace.QName;

@Setter
@Getter
@Entity
@Table (name = "notice")
@ToString
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String ownerName;
    private String ownerId;
    private String description;
    private String mobileNumber;
    private String date;
    private String image;
}
