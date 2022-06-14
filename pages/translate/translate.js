const Model = require('../../lib/function.js');
var YuanWen = "";
var MiWen = "";
var FuZhiMiWen = "";
var YeMianMingCheng = "translate";
Page({
    data: {
        YuanWenOutput: "",
        MiWenOutput: "",
        FuZhiMiWenOutput: 0
    },
    onLoad: function () {
        YuanWen = Model._get_storage(YeMianMingCheng, YeMianMingCheng + "_YuanWen");
        this.setData({YuanWenOutput: YuanWen})
        MiWen = Model._get_storage(YeMianMingCheng, YeMianMingCheng + "_MiWen");
        this.setData({MiWenOutput: MiWen})
        FuZhiMiWen = Model._get_storage(YeMianMingCheng, YeMianMingCheng + "_FuZhiMiWen");
        this.setData({FuZhiMiWenOutput: FuZhiMiWen})
    },
    onUnload: function () {
        console.info(YeMianMingCheng + ": onUnload");
        Model._set_storage(YeMianMingCheng, YeMianMingCheng + "_YuanWen", YuanWen);
        Model._set_storage(YeMianMingCheng, YeMianMingCheng + "_MiWen", MiWen);
        Model._set_storage(YeMianMingCheng, YeMianMingCheng + "_FuZhiMiWen", FuZhiMiWen);
        Model._set_storage(YeMianMingCheng, "Version", Version);
    },
    YuanWenGaiBian(e) {
        YuanWen = e.detail.value;
        console.info(YeMianMingCheng + ": YuanWenGaiBian", YuanWen);
    },
    Encode(_e) {
        if (YuanWen == "") {
            wx.showToast({
                title: "原文不能为空",
                icon: "error",
                duration: 1500
            })
        }
        else {
            MiWen = _GB2Unicode_encode(YuanWen);
            console.info(YeMianMingCheng + ": Encode", "YuanWen", YuanWen, "MiWen", MiWen);
            this.setData({
                MiWenOutput : MiWen
            })
            if (FuZhiMiWen) this.CopyMiWen();
            wx.showToast({
                title: "加密成功",
                icon: "success",
                duration: 1500
            })
        }
    },
    CopyMiWen(_e) {
        console.info(YeMianMingCheng + ": CopyMiWen", MiWen);
        wx.setClipboardData({
            data: MiWen
        })
    },
    GaiBianFuZhiMiWen(e) {
        FuZhiMiWen = (FuZhiMiWen ? false : true);
        console.info(YeMianMingCheng + ": GaiBianFuZhiMiWen", FuZhiMiWen);
        this.setData({
            FuZhiMiWenOutput: FuZhiMiWen
        })
    }
})
function _GB2Unicode_encode(Input) {
    var Output='';
    for (var i = 0; i < Input.length; i++) {
        Output += '\\u';
        var Temp = parseInt(Input.charCodeAt(i)).toString(16);
        if (Temp != null && Temp != '' && Temp != 'undefined') {
            if (Temp.length == 2) {
                Output += '00' + Temp;
            }
            else {
                Output += Temp;
            }
        }
    }
    return Output;
}