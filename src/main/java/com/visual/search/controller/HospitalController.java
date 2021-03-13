package com.visual.search.controller;

import com.visual.search.entity.Hospital;
import com.visual.search.mapper.HospitalMapper;
import com.visual.search.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Zhaofei.Ding
 * @date 2020/10/13 1:17
 */
@RestController
@RequestMapping("/hospital")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @RequestMapping("/{disease}")
    public List<Hospital> queryAllByDisease(@PathVariable String disease){
        return hospitalService.queryAllByDisease(disease);
    }

}
