var nodeView3 = {
    "layout": "ringLayout",
    "renderer": "region",
    "nodes": [
      {
        "layout": "ltrTree",
        "renderer": "focusedChild",
        "nodes": [],
        "displayName": "test85",
        "name": "node_85",
        "dnid": 85,
        "class": "normal",
        "updated": 1523936876017,
        "maxVolume": 50000,
        "connections": []
      },
      {
        "layout": "ltrTree",
        "renderer": "focusedChild",
        "nodes": [],
        "displayName": "test86",
        "name": "node_86",
        "dnid": 86,
        "class": "normal",
        "updated": 1523936876017,
        "maxVolume": 50000,
        "connections": []
      },
       {
        "layout": "ltrTree",
        "renderer": "focusedChild",
        "nodes": [],
        "displayName": "test88",
        "name": "node_88",
        "dnid": 88,
        "class": "normal",
        "updated": 1523936876017,
        "maxVolume": 50000,
        "connections": []
      },
      {
        "layout": "ltrTree",
        "renderer": "focusedChild",
        "nodes": [],
        "displayName": "test89",
        "name": "node_89",
        "dnid": 89,
        "class": "normal",
        "updated": 1523936876017,
        "maxVolume": 50000,
        "connections": []
      }
    ],
    "displayName": "合流上行",
    "name": "newView_test6",
    "class": "normal",
    "updated": 1523936876017,
    "maxVolume": 50000,
    "connections": [
     {
        "source": "node_89",
        "metrics": {
          "normal": 325,
          "danger": 0
        },
        "class": "normal",
        "target": "node_88",
      },
      {
        "source": "node_85",
        "metrics": {
          "normal": 325,
          "danger": 0
        },
        "class": "region",
        "target": "node_86",
        "region":{
            "layout": "ltrTree",
            "renderer": "region",
            "nodes": [
                    {
                      "layout": "ltrTree",
                      "renderer": "focusedChild",
                      "nodes": [],
                      "displayName": "test_2_85",
                      "name": "test_2_85",
                      "dnid": 85,
                      "class": "normal",
                      "updated": 1523936876017,
                      "maxVolume": 50000,
                      "connections": []
                    },
                    {
                      "layout": "ltrTree",
                      "renderer": "focusedChild",
                      "nodes": [],
                      "displayName": "test_2_86",
                      "name": "test_2_86",
                      "dnid": 86,
                      "class": "normal",
                      "updated": 1523936876017,
                      "maxVolume": 50000,
                      "connections": []
                    },
                      {
                      "layout": "ltrTree",
                      "renderer": "focusedChild",
                      "nodes": [],
                      "displayName": "test_2_87",
                      "name": "test_2_87",
                      "dnid": 86,
                      "class": "normal",
                      "updated": 1523936876017,
                      "maxVolume": 50000,
                      "connections": []
                    }
            ],
            "displayName": "合流上行",
            "name": "node_test_2",
            "class": "normal",
            "updated": 1523936876017,
            "maxVolume": 50000,
            "connections": [
              {
                "source": "test_2_85",
                "metrics": {
                  "normal": 325,
                  "danger": 0
                },
                "class": "normal",
                "target": "test_2_86",
              },
               {
                "source": "test_2_85",
                "metrics": {
                  "normal": 325,
                  "danger": 0
                },
                "class": "region",
                "target": "test_2_87",
                "region":{
            "layout": "ltrTree",
            "renderer": "region",
            "nodes": [
                    {
                      "layout": "ltrTree",
                      "renderer": "focusedChild",
                      "nodes": [],
                      "displayName": "test_2_2_85",
                      "name": "test_2_2_85",
                      "dnid": 85,
                      "class": "normal",
                      "updated": 1523936876017,
                      "maxVolume": 50000,
                      "connections": []
                    },
                    {
                      "layout": "ltrTree",
                      "renderer": "focusedChild",
                      "nodes": [],
                      "displayName": "test_2_2_86",
                      "name": "test_2_2_86",
                      "dnid": 86,
                      "class": "normal",
                      "updated": 1523936876017,
                      "maxVolume": 50000,
                      "connections": []
                    },
                      {
                      "layout": "ltrTree",
                      "renderer": "focusedChild",
                      "nodes": [],
                      "displayName": "test_2_2_87",
                      "name": "test_2_2_87",
                      "dnid": 86,
                      "class": "normal",
                      "updated": 1523936876017,
                      "maxVolume": 50000,
                      "connections": []
                    }
            ],
            "displayName": "合流上行",
            "name": "node_test_2_2",
            "class": "normal",
            "updated": 1523936876017,
            "maxVolume": 50000,
            "connections": [
              {
                "source": "test_2_2_85",
                "metrics": {
                  "normal": 325,
                  "danger": 0
                },
                "class": "normal",
                "target": "test_2_2_86",
              },
               {
                "source": "test_2_2_85",
                "metrics": {
                  "normal": 325,
                  "danger": 0
                },
                "class": "normal",
                "target": "test_2_2_87",
              }
            ],
            "did": 23
          }
              }
            ],
            "did": 22
          }
        }
      ],
    "did": 22
  }





var nodeViewJava =
 {
  "layout": "ltrTree",
  "renderer": "Group",
  "node_type": "default",
  "displayName": "测试监控traclog",
  "groupId": "YONG_FENG",
  "name": "31",
  "class": "normal",
  "did": 31,
  "maxVolume": 50000,
  "updated": 1529988218320,
  "GroupInfo": [],
  "metadata": {},
  "nodes": [{
    "name": "openapi_msgcenter_connector_yf-UNKNOWN_IDC",
    "renderer": "region",
    "node_type": "default",
    "displayName": "msgcenter_c_yf",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "UNKNOWN_IDC",
    "metadata": {},
    "nodes": [{
      "name": "openapi_msgcenter_connector_yf-UNKNOWN_IDC",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_c_yf",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "UNKNOWN_IDC",
      "metadata": {}
    }, {
      "name": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }, {
      "name": "openapi_msgcenter_processor_yf-YONG_FENG",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_p_yf",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "YONG_FENG",
      "metadata": {}
    }],
    "connections": [{
      "source": "openapi_msgcenter_connector_yf-UNKNOWN_IDC",
      "target": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "metrics": {
        "normal": 16108,
        "warning": 0,
        "danger": 8
      },
      "notices": [{
        "title": "访问量:16116",
        "severity": 3
      }, {
        "title": "异常量:8",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "target": "openapi_msgcenter_processor_yf-YONG_FENG",
      "metrics": {
        "normal": 16108,
        "warning": 0,
        "danger": 8
      },
      "notices": [{
        "title": "访问量:16116",
        "severity": 3
      }, {
        "title": "异常量:8",
        "severity": 3
      }],
      "class": "normal"
    }]
  },{
    "name": "openapi_msgcenter_connector2_yf-UNKNOWN_IDC",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "msgcenter_c2_yf",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "UNKNOWN_IDC",
    "metadata": {},
    "nodes": [],
    "connections":[]
  },
  {
    "name": "openapi_msgcenter_connector3_yf-UNKNOWN_IDC",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "msgcenter_c3_yf",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "UNKNOWN_IDC",
    "metadata": {},
    "nodes": [],
    "connections":[]
  }
  , {
    "name": "openapi_msgcenter_processor_yf-YONG_FENG",
    "renderer": "region",
    "node_type": "default",
    "displayName": "msgcenter_p_yf",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {},
    "nodes": [{
      "name": "openapi_msgcenter_processor_yf-YONG_FENG",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_p_yf",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "YONG_FENG",
      "metadata": {}
    }, {
      "name": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }, {
      "name": "openapi_directmessage_rpc_yf-YONG_FENG",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "dm_rpc_yf",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "YONG_FENG",
      "metadata": {}
    }],
    "connections": [{
      "source": "openapi_msgcenter_processor_yf-YONG_FENG",
      "target": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "metrics": {
        "normal": 4393,
        "warning": 0,
        "danger": 23
      },
      "notices": [{
        "title": "访问量:4416",
        "severity": 3
      }, {
        "title": "异常量:23",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "target": "openapi_directmessage_rpc_yf-YONG_FENG",
      "metrics": {
        "normal": 4393,
        "warning": 0,
        "danger": 23
      },
      "notices": [{
        "title": "访问量:4416",
        "severity": 3
      }, {
        "title": "异常量:23",
        "severity": 3
      }],
      "class": "normal"
    }]
  }, {
    "name": "openapi_directmessage_yf_inner-YONG_FENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_yf_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_tc_inner-TU_CHENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_tc_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "TU_CHENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_rpc_yf-YONG_FENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_rpc_yf",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_yf_inner-ALI",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_yf_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "ALI",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_tc_inner-BEI_XIAN",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_tc_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "BEI_XIAN",
    "metadata": {}
  }, {
    "name": "openapi_msgcenter_connector_tc-SAI_ER",
    "renderer": "region",
    "node_type": "default",
    "displayName": "msgcenter_c_tc",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "SAI_ER",
    "metadata": {},
    "nodes": [{
      "name": "openapi_msgcenter_connector_tc-SAI_ER",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_c_tc",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "SAI_ER",
      "metadata": {}
    }, {
      "name": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }, {
      "name": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_p_tc",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "BEI_XIAN",
      "metadata": {}
    }],
    "connections": [{
      "source": "openapi_msgcenter_connector_tc-SAI_ER",
      "target": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "metrics": {
        "normal": 16,
        "warning": 0,
        "danger": 0
      },
      "notices": [{
        "title": "访问量:16",
        "severity": 3
      }, {
        "title": "异常量:0",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "target": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "metrics": {
        "normal": 16,
        "warning": 0,
        "danger": 0
      },
      "notices": [{
        "title": "访问量:16",
        "severity": 3
      }, {
        "title": "异常量:0",
        "severity": 3
      }],
      "class": "normal"
    }]
  }, {
    "name": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "renderer": "region",
    "node_type": "default",
    "displayName": "msgcenter_p_tc",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "BEI_XIAN",
    "metadata": {},
    "nodes": [{
      "name": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_p_tc",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "BEI_XIAN",
      "metadata": {}
    }, {
      "name": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }, {
      "name": "openapi_directmessage_rpc_tc-BEI_XIAN",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "dm_rpc_tc",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "BEI_XIAN",
      "metadata": {}
    }],
    "connections": [{
      "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "target": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "metrics": {
        "normal": 632,
        "warning": 0,
        "danger": 2
      },
      "notices": [{
        "title": "访问量:634",
        "severity": 3
      }, {
        "title": "异常量:2",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "target": "openapi_directmessage_rpc_tc-BEI_XIAN",
      "metrics": {
        "normal": 632,
        "warning": 0,
        "danger": 2
      },
      "notices": [{
        "title": "访问量:634",
        "severity": 3
      }, {
        "title": "异常量:2",
        "severity": 3
      }],
      "class": "normal"
    }]
  }, {
    "name": "openapi_directmessage_yf_inner-YONG_FENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_yf_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_tc_inner-BEI_XIAN",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_tc_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "BEI_XIAN",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_yf_inner-ALI",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_yf_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "ALI",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_rpc_tc-TU_CHENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_rpc_tc",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "TU_CHENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_tc_inner-TU_CHENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_tc_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "TU_CHENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_rpc_tc-BEI_XIAN",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_rpc_tc",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "BEI_XIAN",
    "metadata": {}
  }, {
    "name": "openapi_msgcenter_connector_yf-YONG_FENG",
    "renderer": "region",
    "node_type": "default",
    "displayName": "msgcenter_c_yf",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {},
    "nodes": [{
      "name": "openapi_msgcenter_connector_yf-YONG_FENG",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_c_yf",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "YONG_FENG",
      "metadata": {}
    }, {
      "name": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }, {
      "name": "openapi_msgcenter_processor_yf-YONG_FENG",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_p_yf",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "YONG_FENG",
      "metadata": {}
    }],
    "connections": [{
      "source": "openapi_msgcenter_connector_yf-YONG_FENG",
      "target": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "metrics": {
        "normal": 17496,
        "warning": 0,
        "danger": 6
      },
      "notices": [{
        "title": "访问量:17502",
        "severity": 3
      }, {
        "title": "异常量:6",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "target": "openapi_msgcenter_processor_yf-YONG_FENG",
      "metrics": {
        "normal": 17496,
        "warning": 0,
        "danger": 6
      },
      "notices": [{
        "title": "访问量:17502",
        "severity": 3
      }, {
        "title": "异常量:6",
        "severity": 3
      }],
      "class": "normal"
    }]
  }, {
    "name": "openapi_msgcenter_processor_yf-YONG_FENG",
    "renderer": "region",
    "node_type": "default",
    "displayName": "msgcenter_p_yf",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {},
    "nodes": [{
      "name": "openapi_msgcenter_processor_yf-YONG_FENG",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_p_yf",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "YONG_FENG",
      "metadata": {}
    }, {
      "name": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }, {
      "name": "openapi_directmessage_rpc_yf-YONG_FENG",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "dm_rpc_yf",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "YONG_FENG",
      "metadata": {}
    }],
    "connections": [{
      "source": "openapi_msgcenter_processor_yf-YONG_FENG",
      "target": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "metrics": {
        "normal": 4393,
        "warning": 0,
        "danger": 23
      },
      "notices": [{
        "title": "访问量:4416",
        "severity": 3
      }, {
        "title": "异常量:23",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "target": "openapi_directmessage_rpc_yf-YONG_FENG",
      "metrics": {
        "normal": 4393,
        "warning": 0,
        "danger": 23
      },
      "notices": [{
        "title": "访问量:4416",
        "severity": 3
      }, {
        "title": "异常量:23",
        "severity": 3
      }],
      "class": "normal"
    }]
  }, {
    "name": "openapi_directmessage_yf_inner-YONG_FENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_yf_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_tc_inner-TU_CHENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_tc_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "TU_CHENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_rpc_yf-YONG_FENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_rpc_yf",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_yf_inner-ALI",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_yf_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "ALI",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_tc_inner-BEI_XIAN",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_tc_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "BEI_XIAN",
    "metadata": {}
  }, {
    "name": "openapi_msgcenter_connector_tc-UNKNOWN_IDC",
    "renderer": "region",
    "node_type": "default",
    "displayName": "msgcenter_c_tc",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "UNKNOWN_IDC",
    "metadata": {},
    "nodes": [{
      "name": "openapi_msgcenter_connector_tc-UNKNOWN_IDC",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_c_tc",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "UNKNOWN_IDC",
      "metadata": {}
    }, {
      "name": "com_weibo_api_wsccenter_rpcclient_captcharpcservice_captcha",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "com_weibo_api_wsccenter_rpcclient_captcharpcservice_captcha",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }, {
      "name": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_p_tc",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "BEI_XIAN",
      "metadata": {}
    }, {
      "name": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }],
    "connections": [{
      "source": "openapi_msgcenter_connector_tc-UNKNOWN_IDC",
      "target": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "metrics": {
        "normal": 15386,
        "warning": 0,
        "danger": 4
      },
      "notices": [{
        "title": "访问量:15390",
        "severity": 3
      }, {
        "title": "异常量:4",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "openapi_msgcenter_connector_tc-UNKNOWN_IDC",
      "target": "com_weibo_api_wsccenter_rpcclient_captcharpcservice_captcha",
      "metrics": {
        "normal": 0,
        "warning": 0,
        "danger": 0
      },
      "notices": [{
        "title": "访问量:0",
        "severity": 3
      }, {
        "title": "异常量:0",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "com_weibo_api_wsccenter_rpcclient_captcharpcservice_captcha",
      "target": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "metrics": {
        "normal": 0,
        "warning": 0,
        "danger": 0
      },
      "notices": [{
        "title": "访问量:0",
        "severity": 3
      }, {
        "title": "异常量:0",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "com_weibo_api_wsccenter_rpcclient_messageprocessor_process",
      "target": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "metrics": {
        "normal": 15386,
        "warning": 0,
        "danger": 4
      },
      "notices": [{
        "title": "访问量:15390",
        "severity": 3
      }, {
        "title": "异常量:4",
        "severity": 3
      }],
      "class": "normal"
    }]
  }, {
    "name": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "renderer": "region",
    "node_type": "default",
    "displayName": "msgcenter_p_tc",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "BEI_XIAN",
    "metadata": {},
    "nodes": [{
      "name": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "msgcenter_p_tc",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "BEI_XIAN",
      "metadata": {}
    }, {
      "name": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "metadata": {}
    }, {
      "name": "openapi_directmessage_rpc_tc-BEI_XIAN",
      "renderer": "focusedChild",
      "node_type": "default",
      "displayName": "dm_rpc_tc",
      "maxVolume": 50000,
      "class": "normal",
      "layout": "ltrTree",
      "updated": 1529988218320,
      "GroupInfo": [],
      "groupId": "BEI_XIAN",
      "metadata": {}
    }],
    "connections": [{
      "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
      "target": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "metrics": {
        "normal": 632,
        "warning": 0,
        "danger": 2
      },
      "notices": [{
        "title": "访问量:634",
        "severity": 3
      }, {
        "title": "异常量:2",
        "severity": 3
      }],
      "class": "normal"
    }, {
      "source": "cn_sina_dm_service_dmapirpcservice_sendnewdirectmessage",
      "target": "openapi_directmessage_rpc_tc-BEI_XIAN",
      "metrics": {
        "normal": 632,
        "warning": 0,
        "danger": 2
      },
      "notices": [{
        "title": "访问量:634",
        "severity": 3
      }, {
        "title": "异常量:2",
        "severity": 3
      }],
      "class": "normal"
    }]
  }, {
    "name": "openapi_directmessage_yf_inner-YONG_FENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_yf_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "YONG_FENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_tc_inner-BEI_XIAN",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_tc_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "BEI_XIAN",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_yf_inner-ALI",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_yf_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "ALI",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_rpc_tc-TU_CHENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_rpc_tc",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "TU_CHENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_tc_inner-TU_CHENG",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_tc_inner",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "TU_CHENG",
    "metadata": {}
  }, {
    "name": "openapi_directmessage_rpc_tc-BEI_XIAN",
    "renderer": "focusedChild",
    "node_type": "default",
    "displayName": "dm_rpc_tc",
    "maxVolume": 50000,
    "class": "normal",
    "layout": "ltrTree",
    "updated": 1529988218320,
    "GroupInfo": [],
    "groupId": "BEI_XIAN",
    "metadata": {}
  }],
  "connections": [{
    "source": "openapi_msgcenter_connector_yf-UNKNOWN_IDC",
    "target": "openapi_msgcenter_processor_yf-YONG_FENG",
    "metrics": {
      "normal": 16108,
      "warning": 0,
      "danger": 8
    },
    "notices": [{
      "title": "访问量:16116",
      "severity": 3
    }, {
      "title": "异常量:8",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_tc_inner-BEI_XIAN",
    "metrics": {
      "normal": 5394,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:5394",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_yf_inner-ALI",
    "metrics": {
      "normal": 4909,
      "warning": 0,
      "danger": 1
    },
    "notices": [{
      "title": "访问量:4910",
      "severity": 3
    }, {
      "title": "异常量:1",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_rpc_yf-YONG_FENG",
    "metrics": {
      "normal": 4393,
      "warning": 0,
      "danger": 23
    },
    "notices": [{
      "title": "访问量:4416",
      "severity": 3
    }, {
      "title": "异常量:23",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_tc_inner-TU_CHENG",
    "metrics": {
      "normal": 2620,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:2620",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_yf_inner-YONG_FENG",
    "metrics": {
      "normal": 5234,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:5234",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_connector_tc-SAI_ER",
    "target": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "metrics": {
      "normal": 16,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:16",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_rpc_tc-BEI_XIAN",
    "metrics": {
      "normal": 632,
      "warning": 0,
      "danger": 2
    },
    "notices": [{
      "title": "访问量:634",
      "severity": 3
    }, {
      "title": "异常量:2",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_tc_inner-TU_CHENG",
    "metrics": {
      "normal": 1154,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:1154",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_rpc_tc-TU_CHENG",
    "metrics": {
      "normal": 1335,
      "warning": 0,
      "danger": 5
    },
    "notices": [{
      "title": "访问量:1340",
      "severity": 3
    }, {
      "title": "异常量:5",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_yf_inner-ALI",
    "metrics": {
      "normal": 2376,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:2376",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_tc_inner-BEI_XIAN",
    "metrics": {
      "normal": 2538,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:2538",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_yf_inner-YONG_FENG",
    "metrics": {
      "normal": 2466,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:2466",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_connector_yf-YONG_FENG",
    "target": "openapi_msgcenter_processor_yf-YONG_FENG",
    "metrics": {
      "normal": 17496,
      "warning": 0,
      "danger": 6
    },
    "notices": [{
      "title": "访问量:17502",
      "severity": 3
    }, {
      "title": "异常量:6",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_tc_inner-BEI_XIAN",
    "metrics": {
      "normal": 5394,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:5394",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_yf_inner-ALI",
    "metrics": {
      "normal": 4909,
      "warning": 0,
      "danger": 1
    },
    "notices": [{
      "title": "访问量:4910",
      "severity": 3
    }, {
      "title": "异常量:1",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_rpc_yf-YONG_FENG",
    "metrics": {
      "normal": 4393,
      "warning": 0,
      "danger": 23
    },
    "notices": [{
      "title": "访问量:4416",
      "severity": 3
    }, {
      "title": "异常量:23",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_tc_inner-TU_CHENG",
    "metrics": {
      "normal": 2620,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:2620",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_yf-YONG_FENG",
    "target": "openapi_directmessage_yf_inner-YONG_FENG",
    "metrics": {
      "normal": 5234,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:5234",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_connector_tc-UNKNOWN_IDC",
    "target": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "metrics": {
      "normal": 15386,
      "warning": 0,
      "danger": 4
    },
    "notices": [{
      "title": "访问量:15390",
      "severity": 3
    }, {
      "title": "异常量:4",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_rpc_tc-BEI_XIAN",
    "metrics": {
      "normal": 632,
      "warning": 0,
      "danger": 2
    },
    "notices": [{
      "title": "访问量:634",
      "severity": 3
    }, {
      "title": "异常量:2",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_tc_inner-TU_CHENG",
    "metrics": {
      "normal": 1154,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:1154",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_rpc_tc-TU_CHENG",
    "metrics": {
      "normal": 1335,
      "warning": 0,
      "danger": 5
    },
    "notices": [{
      "title": "访问量:1340",
      "severity": 3
    }, {
      "title": "异常量:5",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_yf_inner-ALI",
    "metrics": {
      "normal": 2376,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:2376",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_tc_inner-BEI_XIAN",
    "metrics": {
      "normal": 2538,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:2538",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }, {
    "source": "openapi_msgcenter_processor_tc-BEI_XIAN",
    "target": "openapi_directmessage_yf_inner-YONG_FENG",
    "metrics": {
      "normal": 2466,
      "warning": 0,
      "danger": 0
    },
    "notices": [{
      "title": "访问量:2466",
      "severity": 3
    }, {
      "title": "异常量:0",
      "severity": 3
    }],
    "class": "normal"
  }]
}