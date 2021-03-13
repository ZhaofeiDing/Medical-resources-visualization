package com.visual.search.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Zhaofei.Ding
 * @date 2020/10/12 23:37
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiseaseHospital {
    private String diseaseCategory;
    private String diseaseSubcategory;
    private String diseaseName;
    private String recommendOrder;
    private String votes;
    private String recDoctorNums;
    private String diseaseHospitalHref;
    private String evaluationHref;
    private Integer id;
    private String province;
    private String hospitalName;
    private String hospitalLevel;
    private String hospitalType;
    private String departmentNum;
    private String doctorNum;
    private String telephone;
    private String hospitalHref;
    private String longitude;
    private String latitude;
    private String comment;
    private String commentCut;
    private String commentNum;

}
