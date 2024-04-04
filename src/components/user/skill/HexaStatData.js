const hexaStatData = [
  { main_stat_level: 1, main_stat_name: '공격력 증가', value: 5 },
  { main_stat_level: 2, main_stat_name: '공격력 증가', value: 10 },
  { main_stat_level: 3, main_stat_name: '공격력 증가', value: 15 },
  { main_stat_level: 4, main_stat_name: '공격력 증가', value: 20 },
  { main_stat_level: 5, main_stat_name: '공격력 증가', value: 30 },
  { main_stat_level: 6, main_stat_name: '공격력 증가', value: 40 },
  { main_stat_level: 7, main_stat_name: '공격력 증가', value: 50 },
  { main_stat_level: 8, main_stat_name: '공격력 증가', value: 65 },
  { main_stat_level: 9, main_stat_name: '공격력 증가', value: 80 },
  { main_stat_level: 10, main_stat_name: '공격력 증가', value: 100 },

  { sub_stat_level: 1, sub_stat_name: '공격력 증가', value: 5 },
  { sub_stat_level: 2, sub_stat_name: '공격력 증가', value: 10 },
  { sub_stat_level: 3, sub_stat_name: '공격력 증가', value: 15 },
  { sub_stat_level: 4, sub_stat_name: '공격력 증가', value: 20 },
  { sub_stat_level: 5, sub_stat_name: '공격력 증가', value: 25 },
  { sub_stat_level: 6, sub_stat_name: '공격력 증가', value: 30 },
  { sub_stat_level: 7, sub_stat_name: '공격력 증가', value: 35 },
  { sub_stat_level: 8, sub_stat_name: '공격력 증가', value: 40 },
  { sub_stat_level: 9, sub_stat_name: '공격력 증가', value: 45 },
  { sub_stat_level: 10, sub_stat_name: '공격력 증가', value: 50 },
    
  { main_stat_level: 1, main_stat_name: '마력 증가', value: 5 },
  { main_stat_level: 2, main_stat_name: '마력 증가', value: 10 },
  { main_stat_level: 3, main_stat_name: '마력 증가', value: 15 },
  { main_stat_level: 4, main_stat_name: '마력 증가', value: 20 },
  { main_stat_level: 5, main_stat_name: '마력 증가', value: 30 },
  { main_stat_level: 6, main_stat_name: '마력 증가', value: 40 },
  { main_stat_level: 7, main_stat_name: '마력 증가', value: 50 },
  { main_stat_level: 8, main_stat_name: '마력 증가', value: 65 },
  { main_stat_level: 9, main_stat_name: '마력 증가', value: 80 },
  { main_stat_level: 10, main_stat_name: '마력 증가', value: 100 },

  { sub_stat_level: 1, sub_stat_name: '마력 증가', value: 5 },
  { sub_stat_level: 2, sub_stat_name: '마력 증가', value: 10 },
  { sub_stat_level: 3, sub_stat_name: '마력 증가', value: 15 },
  { sub_stat_level: 4, sub_stat_name: '마력 증가', value: 20 },
  { sub_stat_level: 5, sub_stat_name: '마력 증가', value: 25 },
  { sub_stat_level: 6, sub_stat_name: '마력 증가', value: 30 },
  { sub_stat_level: 7, sub_stat_name: '마력 증가', value: 35 },
  { sub_stat_level: 8, sub_stat_name: '마력 증가', value: 40 },
  { sub_stat_level: 9, sub_stat_name: '마력 증가', value: 45 },
  { sub_stat_level: 10, sub_stat_name: '마력 증가', value: 50 },

  { main_stat_level: 1, main_stat_name: '크리티컬 데미지 증가', value: '0.35%' },
  { main_stat_level: 2, main_stat_name: '크리티컬 데미지 증가', value: '0.7%' },
  { main_stat_level: 3, main_stat_name: '크리티컬 데미지 증가', value: '1.05%' },
  { main_stat_level: 4, main_stat_name: '크리티컬 데미지 증가', value: '1.4%' },
  { main_stat_level: 5, main_stat_name: '크리티컬 데미지 증가', value: '2.1%' },
  { main_stat_level: 6, main_stat_name: '크리티컬 데미지 증가', value: '2.8%' },
  { main_stat_level: 7, main_stat_name: '크리티컬 데미지 증가', value: '3.5%' },
  { main_stat_level: 8, main_stat_name: '크리티컬 데미지 증가', value: '4.55%' },
  { main_stat_level: 9, main_stat_name: '크리티컬 데미지 증가', value: '5.6%' },
  { main_stat_level: 10, main_stat_name: '크리티컬 데미지 증가', value: '7%' },

  { sub_stat_level: 1, sub_stat_name: '크리티컬 데미지 증가', value: '0.35%' },
  { sub_stat_level: 2, sub_stat_name: '크리티컬 데미지 증가', value: '0.7%' },
  { sub_stat_level: 3, sub_stat_name: '크리티컬 데미지 증가', value: '1.05%' },
  { sub_stat_level: 4, sub_stat_name: '크리티컬 데미지 증가', value: '1.4%' },
  { sub_stat_level: 5, sub_stat_name: '크리티컬 데미지 증가', value: '1.75%' },
  { sub_stat_level: 6, sub_stat_name: '크리티컬 데미지 증가', value: '2.1%' },
  { sub_stat_level: 7, sub_stat_name: '크리티컬 데미지 증가', value: '2.45%' },
  { sub_stat_level: 8, sub_stat_name: '크리티컬 데미지 증가', value: '2.8%' },
  { sub_stat_level: 9, sub_stat_name: '크리티컬 데미지 증가', value: '3.15%' },
  { sub_stat_level: 10, sub_stat_name: '크리티컬 데미지 증가', value: '3.5%' },

  { main_stat_level: 1, main_stat_name: '보스 데미지', value: '1%' },
  { main_stat_level: 2, main_stat_name: '보스 데미지', value: '2%'},
  { main_stat_level: 3, main_stat_name: '보스 데미지', value: '3%' },
  { main_stat_level: 4, main_stat_name: '보스 데미지', value: '4%' },
  { main_stat_level: 5, main_stat_name: '보스 데미지', value: '6%' },
  { main_stat_level: 6, main_stat_name: '보스 데미지', value: '8%' },
  { main_stat_level: 7, main_stat_name: '보스 데미지', value: '10%' },
  { main_stat_level: 8, main_stat_name: '보스 데미지', value: '13%' },
  { main_stat_level: 9, main_stat_name: '보스 데미지', value: '16%' },
  { main_stat_level: 10, main_stat_name: '보스 데미지', value: '20%' },
  
  { sub_stat_level: 1, sub_stat_name: '보스 데미지', value: '1%' },
  { sub_stat_level: 2, sub_stat_name: '보스 데미지', value: '2%'},
  { sub_stat_level: 3, sub_stat_name: '보스 데미지', value: '3%' },
  { sub_stat_level: 4, sub_stat_name: '보스 데미지', value: '4%' },
  { sub_stat_level: 5, sub_stat_name: '보스 데미지', value: '5%' },
  { sub_stat_level: 6, sub_stat_name: '보스 데미지', value: '6%' },
  { sub_stat_level: 7, sub_stat_name: '보스 데미지', value: '7%' },
  { sub_stat_level: 8, sub_stat_name: '보스 데미지', value: '8%' },
  { sub_stat_level: 9, sub_stat_name: '보스 데미지', value: '9%' },
  { sub_stat_level: 10, sub_stat_name: '보스 데미지', value: '10%' },

  { main_stat_level: 1, main_stat_name: '방어율 무시', value: '1%' },
  { main_stat_level: 2, main_stat_name: '방어율 무시', value: '2%' },
  { main_stat_level: 3, main_stat_name: '방어율 무시', value: '3%' },
  { main_stat_level: 4, main_stat_name: '방어율 무시', value: '4%' },
  { main_stat_level: 5, main_stat_name: '방어율 무시', value: '6%' },
  { main_stat_level: 6, main_stat_name: '방어율 무시', value: '8%' },
  { main_stat_level: 7, main_stat_name: '방어율 무시', value: '10%' },
  { main_stat_level: 8, main_stat_name: '방어율 무시', value: '13%' },
  { main_stat_level: 9, main_stat_name: '방어율 무시', value: '16%' },
  { main_stat_level: 10, main_stat_name: '방어율 무시', value: '20%' },

  { sub_stat_level: 1, sub_stat_name: '방어율 무시', value: '1%' },
  { sub_stat_level: 2, sub_stat_name: '방어율 무시', value: '2%' },
  { sub_stat_level: 3, sub_stat_name: '방어율 무시', value: '3%' },
  { sub_stat_level: 4, sub_stat_name: '방어율 무시', value: '4%' },
  { sub_stat_level: 5, sub_stat_name: '방어율 무시', value: '5%' },
  { sub_stat_level: 6, sub_stat_name: '방어율 무시', value: '6%' },
  { sub_stat_level: 7, sub_stat_name: '방어율 무시', value: '7%' },
  { sub_stat_level: 8, sub_stat_name: '방어율 무시', value: '8%' },
  { sub_stat_level: 9, sub_stat_name: '방어율 무시', value: '9%' },
  { sub_stat_level: 10, sub_stat_name: '방어율 무시', value: '10%' },

  { main_stat_level: 1, main_stat_name: '데미지', value: '0.75%' },
  { main_stat_level: 2, main_stat_name: '데미지', value: '1.5%' },
  { main_stat_level: 3, main_stat_name: '데미지', value: '2.25%' },
  { main_stat_level: 4, main_stat_name: '데미지', value: '3%' },
  { main_stat_level: 5, main_stat_name: '데미지', value: '4.5%' },
  { main_stat_level: 6, main_stat_name: '데미지', value: '6%' },
  { main_stat_level: 7, main_stat_name: '데미지', value: '7.5%' },
  { main_stat_level: 8, main_stat_name: '데미지', value: '9.75%' },
  { main_stat_level: 9, main_stat_name: '데미지', value: '12%' },
  { main_stat_level: 10, main_stat_name: '데미지', value: '15%' },

  { sub_stat_level: 1, sub_stat_name: '데미지', value: '0.75%' },
  { sub_stat_level: 2, sub_stat_name: '데미지', value: '1.5%' },
  { sub_stat_level: 3, sub_stat_name: '데미지', value: '2.25%' },
  { sub_stat_level: 4, sub_stat_name: '데미지', value: '3%' },
  { sub_stat_level: 5, sub_stat_name: '데미지', value: '3.75%' },
  { sub_stat_level: 6, sub_stat_name: '데미지', value: '4.5%' },
  { sub_stat_level: 7, sub_stat_name: '데미지', value: '5.25%' },
  { sub_stat_level: 8, sub_stat_name: '데미지', value: '6%' },
  { sub_stat_level: 9, sub_stat_name: '데미지', value: '6.75%' },
  { sub_stat_level: 10, sub_stat_name: '데미지', value: '7.5%' },

  { main_stat_level: 1, main_stat_name: '주력 스탯 증가', value: 100, xenon_value: 48, demon_avenger_value: '2,100'},
  { main_stat_level: 2, main_stat_name: '주력 스탯 증가', value: 200, xenon_value: 96, demon_avenger_value: '4,200'},
  { main_stat_level: 3, main_stat_name: '주력 스탯 증가', value: 300, xenon_value: 144, demon_avenger_value: '6,300'},
  { main_stat_level: 4, main_stat_name: '주력 스탯 증가', value: 400, xenon_value: 192, demon_avenger_value: '8,400'},
  { main_stat_level: 5, main_stat_name: '주력 스탯 증가', value: 600, xenon_value: 288, demon_avenger_value: '12,600'},
  { main_stat_level: 6, main_stat_name: '주력 스탯 증가', value: 800, xenon_value: 384, demon_avenger_value: '16,800'},
  { main_stat_level: 7, main_stat_name: '주력 스탯 증가', value: '1,000', xenon_value: 480, demon_avenger_value: '21,000'},
  { main_stat_level: 8, main_stat_name: '주력 스탯 증가', value: '1,300', xenon_value: 624, demon_avenger_value: '27,300'},
  { main_stat_level: 9, main_stat_name: '주력 스탯 증가', value: '1,600', xenon_value: 768, demon_avenger_value: '33,600'},
  { main_stat_level: 10, main_stat_name: '주력 스탯 증가', value: '2,000', xenon_value: 960, demon_avenger_value: '42,000'},

  { sub_stat_level: 1, sub_stat_name: '주력 스탯 증가', value: 100 , xenon_value: 48, demon_avenger_value: '2,100'},
  { sub_stat_level: 2, sub_stat_name: '주력 스탯 증가', value: 200 , xenon_value: 96, demon_avenger_value: '4,200'},
  { sub_stat_level: 3, sub_stat_name: '주력 스탯 증가', value: 300 , xenon_value: 144, demon_avenger_value: '6,300'},
  { sub_stat_level: 4, sub_stat_name: '주력 스탯 증가', value: 400 , xenon_value: 192, demon_avenger_value: '8,400'},
  { sub_stat_level: 5, sub_stat_name: '주력 스탯 증가', value: 500 , xenon_value: 240, demon_avenger_value: '10,500'},
  { sub_stat_level: 6, sub_stat_name: '주력 스탯 증가', value: 600 , xenon_value: 288, demon_avenger_value: '12,600'},
  { sub_stat_level: 7, sub_stat_name: '주력 스탯 증가', value: 700 , xenon_value: 336, demon_avenger_value: '14,700'},
  { sub_stat_level: 8, sub_stat_name: '주력 스탯 증가', value: 800 , xenon_value: 384, demon_avenger_value: '16,800'},
  { sub_stat_level: 9, sub_stat_name: '주력 스탯 증가', value: 900 , xenon_value: 432, demon_avenger_value: '18,900'},
  { sub_stat_level: 10, sub_stat_name: '주력 스탯 증가', value: '1,000' , xenon_value: 480, demon_avenger_value: '21,000'},
];


export default hexaStatData;