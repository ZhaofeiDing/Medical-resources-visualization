package com.visual.search.mapper;

import com.visual.search.entity.Hospital;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

/**
 * @author Zhaofei.Ding
 * @date 2020/10/13 0:39
 */
@Mapper
public interface HospitalMapper {

//    @Select("select distinct a.* from hospital_shanghai a inner join disease_rechospital_shanghai b on a.hospital_name = b.hospital_name " +
//            "where b.disease_name = #{disease} and b.recommend_order <= 10")
//    @Select("select *from hospital_shanghai where hospital_name = #{disease}")
//    List<Hospital> queryAllByDisease(@Param("disease")String disease);

    List<Hospital> queryAllByDisease(String disease);

}
