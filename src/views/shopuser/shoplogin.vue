<template>
    <div>
        <div class="addform">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item prop="email" label="种类">
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                </el-form-item>
                <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'商品' + index"
                    :key="domain.key" :prop="'domains.' + index + '.value'">
                    <el-input v-model="domain.value"></el-input>
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="insertcategory()">提交</el-button>
                    <el-button @click="addDomain">新增商品</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>


<script>
    export default {
        data() {
            return {
                dynamicValidateForm: {
                    domains: [{
                        value: '',
                        fsale: '',
                        
                    }],
                    email: ''
                }
            };
        },

        methods: {

            insertcategory() {
                this.axios.get(this.$Api.category + this.dynamicValidateForm.email).then(body => {
                    
                })
            },


            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            }
        }
    }
</script>


<style lang="scss" scoped>
    .addform {
        width: 50%;
        margin: auto;
    }
</style>