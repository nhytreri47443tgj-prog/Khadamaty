// عرض الطلبات
  renderOrders(filterTab = 'active') {
    const container = document.getElementById('ordersListContainer');
    if (!container) return;

    let list = this.orders;
    if (filterTab === 'active') {
      list = list.filter(o => o.status !== 'مكتمل' && o.status !== 'ملغي');
    } else {
      list = list.filter(o => o.status === 'مكتمل' || o.status === 'ملغي');
    }

    if (list.length === 0) {
      container.innerHTML = 
        <div class="empty-state">
          <i class="fa-solid fa-receipt"></i>
          <p>لا توجد طلبات في هذا القسم حالياً</p>
        </div>
      ;
      return;
    }

    container.innerHTML = list.map(ord => 
      <div class="order-card">
        <div class="order-top">
          <span class="order-number">طلب #${ord.orderNumber}</span>
          <span class="order-status">${ord.status}</span>
        </div>
        <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 6px;">${ord.serviceName}</h4>
        <p class="order-details-p"><i class="fa-regular fa-calendar"></i> الموعد: ${ord.date}</p>
        <p class="order-details-p"><i class="fa-solid fa-location-dot"></i> الموقع: ${ord.location}</p>
        <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border); padding-top: 8px;">
          <span style="font-weight: 800; color: var(--primary-dark); font-size: 13px;">${ord.price.toLocaleString('ar-IQ')} د.ع</span>
          <button class="btn-emergency-top" style="font-size: 11px; padding: 4px 10px;" onclick="alert('جاري التواصل مع خدمة عملاء الطلب #${ord.orderNumber}')">متابعة الفني</button>
        </div>
      </div>
    ).join('');
  },

  // إظهار رسالة سريعة Toast
  showToast(message) {
    const toast = document.getElementById('toastMessage');
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  },

  showAboutApp() {
    alert('تطبيق «خدماتي»\nالمنصة الرقمية الأولى لخدمات الصيانة المنزلية المعتمدة في محافظة ميسان - العمارة.\nجميع الفنيين مسجلون ومضمونون.');
  },

  // تسجيل مستمعي الأحداث
  setupEventListeners() {
    // التنقل السفلي
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    // أزرار الطوارئ
    const openEmg = document.getElementById('openEmergencyBtn');
    if (openEmg) openEmg.addEventListener('click', () => this.openModal('emergencyModal'));

    const bannerEmg = document.getElementById('btnRequestEmergency');
    if (bannerEmg) bannerEmg.addEventListener('click', () => this.openModal('emergencyModal'));

    // تبويبات الطلبات
    document.querySelectorAll('.order-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderOrders(tab.dataset.tab);
      });
    });

    // البحث في الخدمات
    const searchInput = document.getElementById('serviceSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderServices();
      });
    }

    // زر الإشعارات العلوي
    const notifBtn = document.getElementById('notifBtn');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        this.showToast('لديك إشعار جديد: عرض صيانة المكيفات متاح الآن');
      });
    }
  }
};

// تشغيل التطبيق عند اكتمال تحميل DOM
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});