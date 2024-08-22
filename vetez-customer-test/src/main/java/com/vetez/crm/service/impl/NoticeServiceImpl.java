package com.vetez.crm.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vetez.crm.entity.NoticeEntity;
import com.vetez.crm.model.Notice;
import com.vetez.crm.repository.NoticeRepository;
import com.vetez.crm.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeRepository repository;

    @Autowired
    ObjectMapper mapper;
    @Override
    public void saveNotice(Notice notice) {

        NoticeEntity entity=mapper.convertValue(notice, NoticeEntity.class);
        repository.save(entity);
    }

    @Override
    public List<Notice> getNotice() {
        List<Notice> noticeList=new ArrayList<>();
                repository.findAll().forEach(notice->{
                    noticeList.add(mapper.convertValue(notice, Notice.class));
                });
        return noticeList;
    }

    @Override
    public Notice searchNotice(String ownerId) {

        for(NoticeEntity notice:repository.findAll()){
            System.out.println(notice.getId());
            if(ownerId.equals(notice.getOwnerId())){
                System.out.println("hi");
                return mapper.convertValue(notice,Notice.class);
            }
        };
        return null;
    }


}
