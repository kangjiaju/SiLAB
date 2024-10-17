import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">联系我们</h2>
      <div className="space-y-4">
        <p>如果您有任何问题、建议或需要支持，请随时与我们联系。我们的团队将竭诚为您服务。</p>
        <section>
          <h3 className="text-xl font-semibold mb-2">联系方式</h3>
          <ul className="space-y-2">
            <li>
              <strong>电子邮件：</strong> 
              <a href="mailto:support@silab.com" className="text-blue-600 hover:underline">kjj_python@163.com</a>
            </li>
            <li>
              <strong>电话：</strong> +86 18753863983
            </li>
            <li>
              <strong>地址：</strong> 中国广东省珠海市 北京师范大学
            </li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">工作时间</h3>
          <p>周一至周五：上午9:00 - 下午6:00</p>
          <p>周六、周日和法定节假日休息</p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">反馈表单</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">姓名</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">电子邮件</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">消息</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              发送消息
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;