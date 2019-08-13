export const sampleSidebarMenu = [
  {
    label: 'Dữ liệu đầu vào',
    icon: 'fa fa-tv',
    route: '/master-data',
    exact: true,
    isOpened: false,
    isShowed: true,
    children: [
      {
        label: 'Quản lý nhóm kinh doanh',
        route: '/master-data/business-group',
        exact: true,
        isShowed: true,
      },
      {
        label: 'Quản lý ngân hàng',
        route: '/master-data/business-group/bank',
        isShowed: true,
      },
      {
        label: 'Đơn vị tính sản phẩm',
        route: '/master-data/business-group/unit',
        isShowed: true,
      },
      {
        label: 'Quản lý sản phẩm',
        route: '/master-data/business-group/item',
        isShowed: true,
      },

      {
        label: 'Quản lý tài sản',
        route: '/master-data/business-group/asset',
        isShowed: true,
      },
      {
        label: 'Quản lý nhân viên',
        route: '/master-data/business-group/employee',
        isShowed: true,
      },
      {
        label: 'Quản lý khách hàng',
        route: '/master-data/business-group/customer',
        isShowed: true,
      },
      {
        label: 'Quản lý nhà cung cấp',
        route: '/master-data/business-group/supplier',
        isShowed: true,
      },
      {
        label: 'Tiền tệ',
        route: '/master-data/business-group/currency',
        isShowed: true,
      },
      {
        label: 'Chức vụ công việc',
        route: '/master-data/business-group/job-title',
        isShowed: true,
      },
      {
        label: 'Cấp bậc công việc',
        route: '/master-data/business-group/job-level',
        isShowed: true,
      },
      {
        label: 'Tỉnh thành',
        route: '/master-data/business-group/province',
        isShowed: true,
      },
      {
        divider: true,
        isShowed: true,
      },
      {
        label: 'Bộ sổ',
        exact: true,
        route: '/master-data/sob',
        isShowed: true,
      },
      {
        label: 'Tài khoản ngân hàng',
        isShowed: true,
        route: '/master-data/sob/bank-account',
      },
      {
        label: 'Hệ thống tài khoản',
        isShowed: true,
        route: '/master-data/sob/coa',
      },
      {
        label: 'Biểu thuế tiêu thụ đặc biệt',
        isShowed: true,
        route: '/master-data/sob/special-consumption-tax',
      },
      {
        label: 'Biểu thuế tài nguyên',
        isShowed: true,
        route: '/master-data/sob/resource-tax',
      },
      {
        label: 'Biểu thuế giá trị gia tăng',
        isShowed: true,
        route: '/master-data/sob/value-added-tax',
      },
      {
        label: 'Biểu thuế xuất khẩu',
        isShowed: true,
        route: '/master-data/sob/export-tax',
      },

      {
        label: 'Biểu thuế nhập khẩu',
        isShowed: true,
        route: '/master-data/sob/import-tax',
      },
      {
        label: 'Biểu thuế môi trường',
        isShowed: true,
        route: '/master-data/sob/environment-tax',
      },
      {
        label: 'Trung tâm chi phí',
        isShowed: true,
        route: '/master-data/sob/cost-center',
      },
      {
        label: 'Năm tài chính',
        isShowed: true,
        route: '/master-data/sob/fiscal-year',
      },
      {
        label: 'Kỳ kế toán',
        isShowed: true,
        route: '/master-data/sob/accounting-period',
      },
      {
        label: 'Phương thức thanh toán',
        isShowed: true,
        route: '/master-data/sob/payment-method',
      },
      {
        label: 'Điều khoản thanh toán',
        isShowed: true,
        route: '/master-data/sob/payment-term',
      },
      {
        divider: true,
        isShowed: true,
      },
      {
        label: 'Quản lý pháp nhân',
        route: '/master-data/legal-entity',
        exact: true,
        isShowed: true,
      },
      {
        label: 'Khách hàng của pháp nhân',
        route: '/master-data/legal-entity/customer-of-legal-entity',
        isShowed: true,
      },
      {
        label: 'Quản lý nhóm KH',
        route: '/master-data/legal-entity/customer-group',
        isShowed: true,
      },
      {
        label: 'NCC của pháp nhân',
        route: '/master-data/legal-entity/supplier-of-legal-entity',
        isShowed: true,
      },
      {
        label: 'Quản lý nhóm NCC',
        route: '/master-data/legal-entity/supplier-group',
        isShowed: true,
      },
      {
        label: 'Nhân viên của pháp nhân',
        route: '/master-data/legal-entity/employee-of-legal-entity',
        isShowed: true,
      },
      {
        label: 'Quản lý nhóm nhân viên',
        route: '/master-data/legal-entity/employee-position',
        isShowed: true,
      },
      {
        label: 'Sản phẩm của pháp nhân',
        route: '/master-data/legal-entity/item-of-legal-entity',
        isShowed: true,
      },
      {
        label: 'Quản lý nhóm sản phẩm',
        route: '/master-data/legal-entity/item-group',
        isShowed: true,
      },
      {
        label: 'Khai báo vị trí lưu kho',
        route: '/master-data/legal-entity/bin-location',
        isShowed: true,
      },
      {
        label: 'Khai báo quy tắc mã',
        route: '/master-data/legal-entity/code-formula',
        isShowed: true,
        exact: false,
      },
      {
        label: 'Giá đặc biệt NCC',
        route: '/master-data/legal-entity/special-price-supplier',
        isShowed: true,
      },
      {
        label: 'Giá đặc biệt KH',
        route: '/master-data/legal-entity/special-price-customer',
        isShowed: true,
      },
      {
        divider: true,
        isShowed: true,
      },
      {
        label: 'Quản lý chi nhánh',
        route: '/master-data/division',
        exact: true,
        isShowed: true,
      },
      {
        divider: true,
        isShowed: true,
      },
      {
        label: 'Quản lý nhân sự',
        route: '/master-data/department/hr-organization',
        isShowed: true,
        exact: false,
      },
      {
        label: 'Quản lý tài sản',
        route: '/master-data/department/asset-organization',
        isShowed: true,
        exact: false,
      },
      {
        label: 'Quản lý kho bãi',
        route: '/master-data/department/warehouse-group',
        isShowed: true,
        exact: false,
      },
      {
        label: 'Quản lý dự án',
        route: '/master-data/department/project-organization',
        isShowed: true,
        exact: false,
      },
    ],
  },
];
