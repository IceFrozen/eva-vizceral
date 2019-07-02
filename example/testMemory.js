var nodeView5 = {
    "layout": "ltrTree",
    "renderer": "region",
    "displayName": "合流上行",
    "name": "newView_test4",
    "class": "normal",
    "updated": 1523936876017,
    "maxVolume": 50000,
    "nodes": [
      {
        "layout": "ltrTree",
        "renderer": "region",
        "nodes": [],
        "displayName": "1",
        "name": "1",
        "dnid": 85,
        "class": "normal",
        "updated": 1523936876017,
        "maxVolume": 50000,
        "nodes": [
           {
            "layout": "ltrTree",
            "renderer": "focusedChild",
            "nodes": [],
            "displayName": "1-1",
            "name": "1-1",
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
            "displayName": "1-2",
            "name": "1-2",
            "dnid": 86,
            "class": "normal",
            "updated": 1523936876017,
            "maxVolume": 50000,
            "connections": []
          }
        ],
        "connections": [
          {
            "source": "1-1",
            "metrics": {
              "normal": 1,
              "danger": 0
            },
            "class": "normal",
            "target": "1-2",
          }
        ]
      },
      {
        "layout": "ltrTree",
        "renderer": "focusedChild",
        "nodes": [],
        "displayName": "2",
        "name": "2",
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
        "displayName": "3",
        "name": "3",
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
        "displayName": "4",
        "name": "4",
        "dnid": 86,
        "class": "normal",
        "updated": 1523936876017,
        "maxVolume": 50000,
        "connections": []
      }
    ],
    "connections": [
     {
        "source": "1",
        "metrics": {
          "normal": 1,
          "danger": 0
        },
        "class": "normal",
        "target": "2",
      },
       {
        "source": "3",
        "metrics": {
          "normal": 1,
          "danger": 0
        },
        "class": "normal",
        "target": "4",
      }
    ],
    "did": 22
  }
var nodeView6 = {
    "layout": "ltrTree",
    "renderer": "region",
    "displayName": "合流上行",
    "name": "newView_test5",
    "class": "normal",
    "updated": 1523936876017,
    "maxVolume": 50000,
    "nodes": [
      {
        "layout": "ltrTree",
        "renderer": "focusedChild",
        "nodes": [],
        "displayName": "3",
        "name": "3",
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
        "displayName": "4",
        "name": "4",
        "dnid": 86,
        "class": "normal",
        "updated": 1523936876017,
        "maxVolume": 50000,
        "connections": []
      }
    ],
    "connections": [
     {
        "source": "3",
        "metrics": {
          "normal": 10000,
          "danger": 0
        },
        "notices":[
          {
            "title":"test1",
            "severity":0
          }
        ],
        "class": "normal",
        "target": "4",
      }
    ],
    "did": 22
  }