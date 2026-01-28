export const tips = {
  name: {
    default: {
      required: '用户名称不能为空'
    }
  },
  email: {
    default: {
      required: '邮箱不能为空',
      email: '邮箱格式不正确'
    }
  },
  phone: {
    default: {
      pattern: '手机号格式不正确'
    }
  },
  password: {
    default: {
      required: '密码不能为空'
    }
  }
};
