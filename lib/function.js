module.exports = {
    _get_storage : _get_storage,
    _set_storage : _set_storage,
    XinBanBenTiShi : XinBanBenTiShi
}

function _get_storage(YeMianMingCheng, Name) {
    try {
        var ReturnValue = wx.getStorageSync(Name);
        if (ReturnValue) {
            console.log(YeMianMingCheng + ": getStorageSync", Name, ReturnValue, "success");
            return ReturnValue;
        }
        else {
            console.warn(YeMianMingCheng + ": getStorageSync", Name, "fail");
            return null;
        }
    }
    catch(e) {
        console.warn(YeMianMingCheng + ": getStorageSync", Name, "fail");
        return null;
    }
}
function _set_storage(YeMianMingCheng, Name, Value) {
    try{
        wx.setStorageSync(Name, Value);
        console.log(YeMianMingCheng + ": setStorageSync", Name, Value, "success");
    }
    catch(e) {
        console.log(YeMianMingCheng + ": setStorageSync", Name, Value, "fail");
    }
}
function XinBanBenTiShi(YeMianMingCheng) {
    _set_storage(YeMianMingCheng, "Version", Version);
    wx.showModal({
        showCancel: false,
        title: "新版本提示",
        content: "欢迎使用新版本聊天加密v" + Version + "！"
    })
}
