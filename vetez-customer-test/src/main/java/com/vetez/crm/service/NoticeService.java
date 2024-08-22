package com.vetez.crm.service;

import com.vetez.crm.model.Notice;

import java.util.List;

public interface NoticeService {
    void saveNotice(Notice notice);
    List<Notice> getNotice();
    Notice searchNotice(String ownerId);
}
