<template>
  <div>
    <div class="showsList_main">
      <!-- 检索条件 -->
      <div class="form-parent-newbox">
        <div class="form-title-area">
          <div class="form-title-area-left">
            <span>查询条件</span>
          </div>
          <div class="form-title-area-right">
            <el-button size="mini" icon="el-icon-search" type="primary" @click="handleQuery">查询</el-button>
            <el-button size="mini" icon="el-icon-refresh" type="primary" @click="handleReset">重置</el-button>
          </div>
        </div>
        <el-form size="mini" class="form-area-box" :inline="true" :model="formData" label-position="left">
          <el-row>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="货号">
                <el-input v-model="formData.number" multiple placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="品名">
                <el-input v-model="formData.name" multiple placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="尺码">
                <el-input v-model="formData.size" multiple placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="是否签收">
                <el-select v-model="formData.isSign" placeholder="请选择">
                  <el-option
                    v-for="item in isOrNotList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="是否送定">
                <el-select v-model="formData.isSendPayment" placeholder="请选择">
                  <el-option
                    v-for="item in isOrNotList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="所属平台">
                <el-select v-model="formData.platform" placeholder="请选择">
                  <el-option
                    v-for="item in isOrNotList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 表格 -->
      <div class="table-buttons-box-index">
        <el-button size="mini" type="primary" @click="addHandler">
          新增
        </el-button>
        <el-button size="mini" type="success"
                   @click="editHandler">
          修改
        </el-button>
        <el-button size="mini" type="danger" @click="cancleHandler">
          删除
        </el-button>
        <el-button size="mini" type="success" @click="handleExport">
          模板下载
        </el-button>
        <el-button size="mini" type="success" @click="exportPcYcgAccount">
          导入
        </el-button>
      </div>
      <el-table ref="pcTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :height="tableHeight"
                border :header-cell-style="{ background: '#FAFAFA', color: '#262626', textAlign: 'center' }"
                highlight-current-row @selection-change="selectedRowsChange" @row-click="handleRowClick"
                @row-dblclick="handleSelectedDetail">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" width="60" label="序号" type="index" :index="indexMethod"></el-table-column>
        <el-table-column sortable align="center" prop="name" label="名称"></el-table-column>
        <el-table-column sortable align="center" prop="number" label="货号"></el-table-column>
        <el-table-column sortable align="center" prop="size" label="尺码"
        ></el-table-column>
        <el-table-column sortable align="center" prop="buyRate" label="买入单价"
        ></el-table-column>
        <el-table-column sortable align="center" prop="sellRate" label="卖出价"
        ></el-table-column>
        <el-table-column sortable align="center" prop="profit" label="利润"
        ></el-table-column>
        <el-table-column sortable align="center" prop="isSign" label="是否签收"
        >
          <template v-slot="scope">
            {{ scope.row.isSign == '1' ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column sortable align="center" prop="isSendPayment" label="是否送定"
        >
          <template v-slot="scope">
            {{ scope.row.isSendPayment == '1' ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column sortable align="center" prop="sendPaymentMoney" label="送定金额"
        ></el-table-column>
        <el-table-column sortable align="center" prop="createBy" label="创建人"
        ></el-table-column>
        <el-table-column sortable align="center" prop="belongBy" label="所属人"
        ></el-table-column>
        <el-table-column sortable align="center" prop="platform" label="所属平台"
        >
          <template v-slot="scope">
            {{
              scope.row.platform == 'tb' ? "淘宝" : scope.row.platform == 'jd' ? "京东" : scope.row.platform == 'other' ? "其他" : ""
            }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
                  :totalCount="totalCount" :currentPage="pageNum" :pageSizeList="pageSizeList" :pageSize="pageSize"
                  class="pagination-area-box-index"></Pagination>
    </div>
    <el-dialog
      class="dialogInfo"
      :title="dialogType=='add'?'新增':'修改'"
      :visible.sync="addShowInfoDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
      @close="closeAddperDialog">
      <el-form :inline="true" :model="DialogFormData" size="mini" label-position="left">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="名称:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.name"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货号:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.number"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="尺码:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.size"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="买入价:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.buyRate"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="卖出价:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.sellRate"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="利润:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.profit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否签收:">
              <el-select v-model="DialogFormData.isSign" placeholder="请选择">
                <el-option
                  v-for="item in isOrNotList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否送定:">
              <el-select v-model="DialogFormData.isSendPayment" placeholder="请选择">
                <el-option
                  v-for="item in isOrNotList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="送定金额:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.sendPaymentMoney"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.createBy"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属人:">
              <el-input
                clearable
                placeholder="请输入"
                v-model="DialogFormData.belongBy"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属平台:">
              <el-select v-model="DialogFormData.platform" placeholder="请选择">
                <el-option
                  v-for="item in platformlist"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" icon="el-icon-close" @click="handleClickQX">取 消</el-button>
        <el-button size="mini" icon="el-icon-check" type="primary" @click="handleSaveShoesInfo">确 定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
let me;
import Pagination from "@/components/pagination";
import publicFunc from "@/utils/publicFunc";
import {
  addAndUpdateShoesInfo,
  getShoesList,
  deleteShoesInfo,
  downloadModle
} from "@/api/shoesApi/shoesApis";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      publicFunc: publicFunc,
      isOrNotList: [
        {
          code: 0,
          name: "否"
        }, {
          code: 1,
          name: "是"
        }
      ],
      platformlist: [
        {
          code: "tb",
          name: "淘宝"
        }, {
          code: "jd",
          name: "京东"
        }, {
          code: "other",
          name: "其他"
        }
      ],
      // 表单
      formData: {
        number: "",//货号
        name: "",//名称
        size: "",//尺码
        isSign: "",//是否签收
        isSendPayment: "",//是否送定
        platform: "",//所属平台
      },
      tableHeight: "74vh",
      tableData: [],
      totalCount: 0,
      pageNum: 1,
      pageSizeList: [50, 100, 200],
      pageSize: 50,
      selectedRows: [],
      addShowInfoDialogVisible: false,
      DialogFormData: {
        name: "",
        number: "",
        size: "",
        buyRate: "",
        sellRate: "",
        profit: "",
        isSign: "",
        isSendPayment: "",
        sendPaymentMoney: "",
        createBy: "",
        belongBy: "",
        platform: "",
      },
      dialogType: ""
    };
  },
  mounted() {
    me = this;
    // me.loginHandle()
    me.refreshTableHeight();
    window.onresize = me.refreshTableHeight;
    me.queryItemsList();// 查询页面列表
  },
  beforeDestroy() {
    window.onresize = function () {
    };
  },

  methods: {
    /**
     * 关闭窗口
     */
    closeAddperDialog() {
      me.DialogFormData = {}
      me.addShowInfoDialogVisible = false
    },
    /**
     * 取消编辑
     */
    handleClickQX() {
      me.addShowInfoDialogVisible = false
    },

    /**
     * 设置表格高度
     */
    refreshTableHeight() {
      me.$nextTick(() => {
        let pageHeight = document.querySelector(".el-main");
        let formDom = document.querySelector(".form-parent-newbox");
        let tableButtonsDom = document.querySelector(".table-buttons-box-index");
        let paginationDom = document.querySelector(".pagination-area-box-index");
        me.tableHeight = (pageHeight.offsetHeight - formDom.offsetHeight - tableButtonsDom.offsetHeight - paginationDom.offsetHeight - 25) + "px";
      })
    },
    // 查询
    handleQuery() {
      me.currentPage = 1;
      me.queryItemsList();
    },
    //   序号获取
    indexMethod(index) {
      var total = me.pageSize * (me.pageNum - 1);
      return total + index + 1;
    },
    // 每页展示数量变化时
    handleSizeChange(e) {
      me.pageSize = e;
      me.currentPage = 1;
      me.queryItemsList();
    },
    // 当前页码变化时
    handleCurrentChange(e) {
      me.currentPage = e;
      me.queryItemsList();
    },
    // 重置
    handleReset() {
      me.formData.number = "";
      me.formData.name = "";
      me.formData.size = "";
      me.formData.isSign = "";
      me.formData.isSendPayment = "";
      me.formData.platform = "";
      me.pageNum = 1;
      me.queryItemsList();
    },

    // 查询表格数据
    queryItemsList() {
      let param = me.formData
      param.pageSize = me.pageSize
      param.pageNum = me.pageNum
      getShoesList(param).then(res => {
        if (res.code == 0) {
          me.tableData = res.data;
          me.totalCount = res.data.length;
        }
      })
        .catch(err => {
          // if (err && err.response && err.response.status) {
          //   publicFunc.showModalTips(err.msg || `导出失败，请稍后重试~\n错误码：${err.code}`);
          // } else {
          //   publicFunc.showModalTips(err.msg || `导出失败，请稍后重试~\n错误码：${err.code}`);
          // }
        })
    },
    // 导出
    handleExport() {
      downloadModle()
        .then((res) => {
          // 如果下载失败，返回的是JSON，解析之后给提示
          if (res.data.type == "application/json") {
            const reader = new FileReader();
            reader.readAsText(res.data, 'utf-8');
            reader.onload = function () {
              const {msg} = JSON.parse(reader.result);
              //reader.result里面含报错信息
              publicFunc.showModalTips(msg || `下载失败，请稍后再试~\n错误码：${res.code}`);
            }
            return;
          }
          if (res.data && res.status == 200) {
            let fileNameRes = res.headers["content-disposition"].replace(`attachment;filename*=utf-8''`, "").replace(`"`, "");
            var fileName = decodeURIComponent(fileNameRes);
            publicFunc.downloadFile(res.data, fileName);
          } else {
            publicFunc.showModalTips(res.msg || `导出失败，请稍后重试~\n错误码：${res.code}`);
          }
        })
        .catch((err) => {
          if (err && err.response && err.response.status) {
            publicFunc.showModalTips(`对不起，系统错误，错误码：${err.response.status}`);
          } else {
            publicFunc.showModalTips(err.msg || err.message || "对不起，系统错误，请稍后再试~");
          }
        });
    },
    exportPcYcgAccount() {
    },
    // 单击某一行
    handleRowClick(row, column, event) {
      // me.selectedRows = []
      me.$refs.pcTable.clearSelection();
      me.$refs.pcTable.toggleRowSelection(row);
    },
    // 主页面 单选
    selectedRowsChange(selection) {
      if (selection.length > 1) {
        me.$refs.pcTable.clearSelection();
        me.$refs.pcTable.toggleRowSelection(selection[selection.length - 1]);
        me.selectedRows = selection[selection.length - 1];
      } else if (selection.length == 1) {
        // me.selectedRows = selection[0];
        me.selectedRows = selection;
      } else {
        me.selectedRows = null;
      }
      // if (selection.length >= 1) {
      //   me.selectedRows = selection;
      // } else {
      //   me.selectedRows = [];
      // }
    },
    // 双击查看详情
    handleSelectedDetail(row) {

    },

    addHandler() {
      me.dialogType = "add"
      me.addShowInfoDialogVisible = true
    },
    editHandler() {
      me.dialogType = "edit"
      me.addShowInfoDialogVisible = true
      me.DialogFormData = me.selectedRows[0]
    },
    /**
     * 保存信息
     */
    handleSaveShoesInfo() {
      let url = null
      if (me.dialogType == 'add') {
        url = "/shoes/addShoesInfo"
      }
      if (me.dialogType == 'edit') {
        url = "/shoes/updateShoesInfo"
      }
      if (!url) {
        return
      }
      let param = me.DialogFormData
      addAndUpdateShoesInfo(url, param).then(response => {
        if (response.code == 200) {
          publicFunc.showModalTips(response.message || "操作成功！！！")
          me.addShowInfoDialogVisible = false
          me.handleQuery()
        } else {
          publicFunc.showModalTips(response.message || "操作失败！！！")
        }
      }).catch(err => {
        if (err && err.response && err.response.status) {
          publicFunc.showModalTips(err.msg || `保存失败~\n错误码：${err.code}`);
        } else {
          publicFunc.showModalTips(err.msg || `保存失败，请稍后重试~\n错误码：${err.code}`);
        }
      })
    },
    cancleHandler() {
      if (!(me.selectedRows.length != 0 && me.selectedRows[0].id)) {
        publicFunc.showModalTips("请选择有效信息删除！！！")
        return
      }
      me.$confirm(`此操作将把${me.selectedRows[0].name}的球鞋信息删除, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let param = {ids: me.selectedRows[0].id}
          deleteShoesInfo(param).then(response => {
            console.log(response, "response")
            if (response.code == 200) {
              publicFunc.showModalTips("删除成功！！！")
              me.addShowInfoDialogVisible = false
              me.handleQuery()
            }
          }).catch(err => {
            if (err && err.response && err.response.status) {
              publicFunc.showModalTips(err.msg || `删除失败~\n错误码：${err.code}`);
            } else {
              publicFunc.showModalTips(err.msg || `删除失败，请稍后重试~\n错误码：${err.code}`);
            }
          })
        })
        .catch(() => {
          me.$message({
            type: "info",
            message: "已取消",
          });
        });
    }
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog__header {
  background: #409eff9c;
}

/deep/ .el-dialog__body {
  .el-form {
    .el-row {
      .el-col {
        .el-form-item {
          width: 100%;

          .el-form-item__label {
            width: 90px;
          }

          .el-form-item__content {
            width: calc(100% - 100px);

            .el-select {
              width: 100%;
            }
          }
        }
      }
    }

  }
}

.el-cascader {
  /deep/ .el-cascader__tags {
    height: 24px;
    white-space: nowrap;
    overflow: hidden;
    flex-wrap: nowrap;
  }
}

.el-select {
  /deep/ .el-select__tags {
    height: 24px;
    white-space: nowrap;
    overflow: hidden;
    flex-wrap: nowrap;
  }
}
</style>
