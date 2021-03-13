package com.visual.search.entity;

import lombok.*;

/**
 * @author Zhaofei.Ding
 * @date 2020/10/12 22:23
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hospital {
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

}
