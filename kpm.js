  const companies = [
      { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
      { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
      { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
      { name: 'Goldman Sachs', logo: 'https://logo.clearbit.com/goldmansachs.com' },
      { name: 'PayPal', logo: 'https://logo.clearbit.com/paypal.com' },
      { name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
      { name: 'EY', logo: 'https://logo.clearbit.com/ey.com' },
      { name: 'Hitachi', logo: 'https://logo.clearbit.com/hitachi.com' },
      { name: 'JPMorgan', logo: 'https://logo.clearbit.com/jpmorganchase.com' },
      { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
      { name: 'Dell', logo: 'https://logo.clearbit.com/dell.com' },
      { name: 'Deloitte', logo: 'https://logo.clearbit.com/deloitte.com' },
      { name: 'Adobe', logo: 'https://logo.clearbit.com/adobe.com' },
      { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
      { name: 'Intel', logo: 'https://logo.clearbit.com/intel.com' },
      { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
      { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
      { name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com' }
    ];

    const colors = [
      '#fef6f6',
      '#f6f0fa',
      '#f0f9ff',
      '#f3faf7',
      '#fff9f2',
      '#f9f5ff',
      '#fff8f5',
      '#f4f4f5',
      '#f7f6fb',
      '#f8fafb',
      '#fefcfb',
      '#f7f5f2',
      '#f4f7f6',
      '#f3f6f9',
      '#f6f7f9',
      '#fff0f0',
      '#e6f7ff',
      '#fff7e6'
    ];

    const container = document.getElementById('companyContainer');

    companies.forEach((company, index) => {
      const card = document.createElement('div');
      card.className = 'company-card';
      card.style.background = colors[index % colors.length];

      card.innerHTML = `
        <img src="${company.logo}" alt="${company.name}" class="company-logo" />
        <div class="company-name">${company.name}</div>
      `;

      container.appendChild(card);
    });