package com.vetez.crm.controller;

import com.vetez.crm.model.Notice;
import com.vetez.crm.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class NoticeController {

    @Autowired
    NoticeService service;

    @PostMapping("/save")
    public void saveNotice(@RequestBody Notice notie){
        service.saveNotice(notie);
        System.out.println(notie);
    }

    @GetMapping("/noticeL")
    public List<Notice> getNotice(){
        return service.getNotice();
    }

    @GetMapping("/search-notice")
    public Notice searchNotice(String ownerId){

        Notice notice=service.searchNotice(ownerId);
        System.out.println("ko");
        return notice;
    }
//    @GetMapping("/notice")
//    public String notice(){
//        List<Notice> noticeList=service.getNotice();
//        return "notice";
//    }
}
