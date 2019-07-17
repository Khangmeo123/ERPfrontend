export const sampleSidebarMenu = [
  {
    label: 'Dữ liệu đầu vào',
    icon: 'fa fa-tv',
    route: '/master-data',
    exact: true,
    children: [
      {
        label: 'Quản lý nhóm kinh doanh',
        route: '/master-data/business-group',
        exact: true,
      },
      {
        label: 'Quản lý ngân hàng',
        route: '/master-data/business-group/bank',
      },
      {
        label: 'Quản lý sản phẩm',
        route: '/master-data/business-group/product',
      },
      {
        label: 'Đơn vị tính sản phẩm',
        route: '/master-data/business-group/unit',
      },
      {
        label: 'Quản lý tài sản',
        route: '/master-data/business-group/asset',
      },
      {
        label: 'Quản lý nhân viên',
        route: '/master-data/business-group/employee',
      },
      {
        label: 'Quản lý khách hàng',
        route: '/master-data/business-group/customer',
      },
      {
        label: 'Quản lý nhà cung cấp',
        route: '/master-data/business-group/supplier',
      },
      {
        label: 'Tiền tệ',
        route: '/master-data/business-group/currency',
      },
      {
        divider: true,
      },
      {
        label: 'Bộ sổ',
        route: '/master-data/sob',
        exact: true,
      },
      {
        label: 'Tài khoản ngân hàng',
        route: '/master-data/sob/bank-account',
      },
      {
        label: 'Biểu thuế - HTTK',
        route: '/master-data/sob/tariff-coa',
      },
      {
        label: 'Hệ thống tài khoản',
        route: '/master-data/sob/coa',
      },
      {
        label: 'Biểu thuế tiêu thụ đặc biệt',
        route: '/master-data/sob/excise-tariff',
      },
      {
        label: 'Biểu thuế tài nguyên',
        route: '/master-data/sob/resoure-tariff',
      },
      {
        label: 'Trung tâm chi phí',
        route: '/master-data/sob/cost-center',
      },
      {
        label: 'Năm tài chính',
        route: '/master-data/sob/fiscal-year',
      },
      {
        label: 'Kỳ kế toán',
        route: '/master-data/sob/accountant-period',
      },
      {
        label: 'Quản lý chứng từ',
        route: '/master-data/sob/voucher',
      },
      {
        label: 'Phương thức thanh toán',
        route: '/master-data/sob/payment-method',
      },
      {
        label: 'Điều khoản thanh toán',
        route: '/master-data/sob/payment-term',
      },
      {
        divider: true,
      },
      {
        label: 'Quản lý pháp nhân',
        route: '/master-data/legal-entity',
        exact: true,
      },
      {
        label: 'Khách hàng của pháp nhân',
        route: '/master-data/legal-entity/customer-list-of-legal-entity',
      },
      {
        label: 'Quản lý nhóm KH',
        route: '/master-data/legal-entity/customer-group',
      },
      {
        label: 'NCC của pháp nhân',
        route: '/master-data/legal-entity/supplier-of-legal-entity',
      },
      {
        label: 'Quản lý nhóm NCC',
        route: '/master-data/legal-entity/supplier-group',
      },
      {
        label: 'Nhân viên của pháp nhân',
        route: '/master-data/legal-entity/employee-of-legal-entity',
      },
      {
        label: 'Quản lý nhóm nhân viên',
        route: '/master-data/legal-entity/company-position',
      },
      {
        label: 'Sản phẩm của pháp nhân',
        route: '/master-data/legal-entity/product-of-legal-entity',
      },
      {
        label: 'Quản lý nhóm sản phẩm',
        route: '/master-data/legal-entity/product-group',
      },
      {
        label: 'Giá đặc biệt NCC',
        route: '/master-data/legal-entity/special-price-supplier',
      },
      {
        label: 'Giá đặc biệt KH',
        route: '/master-data/legal-entity/special-price-customer',
      },
      {
        divider: true,
      },
      {
        label: 'Quản lý chi nhánh',
        route: '/master-data/division',
        exact: true,
      },
      {
        divider: true,
      },
      {
        label: 'Quản lý phòng ban',
        route: '/master-data/department',
        exact: true,
      },
    ],
  },
];
