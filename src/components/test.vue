<template>
  <div>
    <router-link to="/">回首页</router-link>
    <router-link to="/radio">测试页</router-link>
    <el-dialog :title="formadd?'添加信息':'编辑信息'+formdata.uj_id" :visible.sync="formshow">
      <el-form label-width="80px">
        <el-row>
          <el-col :xs="24" :sm="12">
            <el-form-item label="记录类型">
              <el-select v-model="formdata.uj_ey" placeholder="请选择记录类型">
                <el-option
                  v-for="item in ujeyarr"
                  :key="item.val"
                  :label="item.ops"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="记录时间">
              <el-date-picker v-model="formdata.uj_as" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="记录内容">
              <el-input type="textarea" v-model="formdata.uj_eo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" v-show="formedit">
            <el-form-item label="记录编号">
              <el-input v-model="formdata.uj_id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" v-show="formedit">
            <el-form-item label="记录用户">
              <el-input v-model="formdata.uj_er" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postadd">添加</el-button>
        <el-button type="primary" @click="postedit">编辑</el-button>
      </div>
    </el-dialog>

    <el-card class="box-card" style="margin:20px 8px;">
      <div slot="header" class="clearfix">
        <span>处理信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">列表</el-button>
      </div>
      <el-row>
        <el-col :span="12">
          返回信息：
          <br />
          {{info}}
        </el-col>
        <el-col :span="12">
          编辑值：
          <br />
          {{formdata}}
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card" style="margin:20px 8px;">
      <div slot="header" class="clearfix">
        <span>记录列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="formadd = true">添加记录</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        {{multipleSelection}}{{selectid}}
      </div>
      <el-table
        ref="multipleTable"
        :data="listdata.list"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="uj_id" label="编号" width="88"></el-table-column>
        <el-table-column label="类型" width="88">
          <template slot-scope="scope">{{readujey(scope.row.uj_ey)}}</template>
        </el-table-column>
        <el-table-column prop="uj_eo" label="内容"></el-table-column>
        <el-table-column prop="uj_as" label="时间" width="168"></el-table-column>
        <el-table-column prop="uj_er" label="用户" width="128"></el-table-column>
        <el-table-column fixed="right" label="操作" width="128">
          <template slot-scope="scope">
            <el-button
              @click="showedit(scope.row.uj_id)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-popover trigger="hover" placement="top" width="110">
              <p align="center">
                确定要删除{{scope.row.uj_id}}吗？
                <br />删除后无法恢复！
                <br />
                <el-button type="danger" size="mini" @click="getdel(scope.row.uj_id)">确定</el-button>
              </p>
              <el-button slot="reference" type="primary" icon="el-icon-delete" size="mini"></el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="parseInt(listdata.page.page)"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="parseInt(listdata.page.pagesize)"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parseInt(listdata.page.record)"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      ujeyarr: [
        {
          ops: '本站收藏',
          val: '0'
        },
        {
          ops: '外站收藏',
          val: '1'
        },
        {
          ops: '我的微博',
          val: '2'
        },
        {
          ops: '匿名发布',
          val: '3'
        },
        {
          ops: '备忘记事',
          val: '6'
        }
      ],
      formadd: false,
      formedit: false,
      formadmin: false,
      formdel: false,
      urlstart: 'http://localhost:87/',
      dataname: 'uj',
      formdata: {},
      formid: 6,
      listdata: {
        page: {
          page: {},
          pagesize: {}
        }
      },
      info: {},
      page: 1,
      pagesize: 10,
      multipleSelection: [],
      selectid: []
    };
  },
  computed: {
    formshow: {
      get () {
        return this.formadd || this.formedit;
      },
      set (val) {
        this.formadd = false;
        this.formedit = false;
      }
    }
  },
  watch: {
    formid: function (val) {
      this.getinfo(val);
    },
    page: function (val) {
      this.getlist();
    },
    pagesize: function (val) {
      this.getlist();
    }
  },
  created () {
    this.getlist();
    this.getinfo(this.formid);
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          console.log('222', row);
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.selectid = [];
      for (let item of val) {
        this.selectid.push(item.uj_id);
      }
    },
    handleSizeChange (val) {
      this.pagesize = val;
    },
    handleCurrentChange (val) {
      this.page = val;
    },
    readujey (val) {
      for (let sval of this.ujeyarr) {
        if (val === sval.val) {
          return sval.ops;
        }
      }
    },
    showmsg (smsg, stype) {
      this.$message({
        showClose: true,
        message: smsg,
        type: stype
      });
    },
    getlist () {
      // ajax获取列表
      this.axios
        .get(
          this.urlstart +
            '?' +
            this.dataname +
            '/list/' +
            this.page +
            '/' +
            this.pagesize
        )
        .then(response => {
          // console.log(response);
          this.listdata = response.data.data.list;
          this.showmsg(
            '列表信息（第' +
              this.page +
              '页/每页' +
              this.pagesize +
              '条）读取成功！',
            'success'
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    getinfo (ga) {
      // ajax获取id信息
      this.axios
        .get(this.urlstart + '?' + this.dataname + '/info/' + ga)
        .then(response => {
          // console.log(response)
          this.formdata = response.data.data.info;
          this.showmsg('成功读取ID为' + ga + '的信息。', 'success');
        })
        .catch(error => {
          console.log(error);
        });
    },
    getdel (ga) {
      // 删除
      this.axios
        .get(this.urlstart + '?' + this.dataname + '/del/' + ga)
        .then(response => {
          // console.log(response);
          this.showmsg('成功删除id为' + ga + '的信息！', 'success');
          this.getlist();
        })
        .catch(error => {
          console.log(error);
        });
    },
    showedit (pa) {
      // 编辑窗口
      this.formedit = true;
      this.formid = pa;
    },
    postadd () {
      // 添加
      if (this.formdata.uj_eo !== '' && this.formdata.uj_er !== '') {
        this.axios({
          method: 'post',
          url: this.urlstart + '?' + this.dataname + '/add/',
          data: this.formdata,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
          // headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',}//指定消息格式
        })
          .then(response => {
            // console.log(response);
            this.info = response.config.data;
            this.page = 1;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.info = {
          err: '备注、用户不能为空！'
        };
      }
    },
    postedit () {
      // 编辑
      console.log(this.formdata);
      if (this.formdata.uj_eo !== '' && this.formdata.uj_er !== '') {
        this.axios({
          method: 'post',
          url: this.urlstart + '?' + this.dataname + '/edit/' + this.formid,
          data: this.formdata,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then(response => {
            // console.log(response);
            this.info = response.config.data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.info = {
          err: '备注、用户不能为空！'
        };
      }
    }
  }
};
</script>
