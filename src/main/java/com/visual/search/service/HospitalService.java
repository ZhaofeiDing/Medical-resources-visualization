package com.visual.search.service;

import com.visual.search.entity.Hospital;
import com.visual.search.mapper.HospitalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Zhaofei.Ding
 * @date 2020/10/19 15:49
 */
@Service
public class HospitalService {

    @Autowired
    HospitalMapper hospitalMapper;

    public List<Hospital> queryAllByDisease(String disease){
        return hospitalMapper.queryAllByDisease(disease);
    }

}
