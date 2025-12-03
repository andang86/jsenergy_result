import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Menu, 
  X, 
  Scale, 
  Users, 
  Briefcase, 
  Coins, 
  Clock, 
  ShieldCheck, 
  Heart,
  FileText,
  AlertTriangle,
  MessageCircle,
  Bookmark
} from 'lucide-react';

// --- DATA: 단체협약 조항 및 해설 데이터 (전체 13개 챕터 완벽 반영) ---
const agreementData = [
  {
    chapterId: "chapter1",
    chapterTitle: "제1장 총칙",
    icon: <Scale className="w-5 h-5" />,
    clauses: [
      {
        id: "art1",
        title: "협약의 우선",
        content: "이 협약에 정한 기준은 근로기준법과 기타 관계 법령, 회사의 제 규칙과 제 규정, 기타 사용자가 조합 및 조합원과 맺은 모든 협정과 개별 계약에 우선하며, 협약 기준에 미달하거나 상반되는 사항은 모두 무효로 하고 이 협약 기준에 따른다.",
        summary: "규정 간 충돌 시 단협 최우선 적용 원칙 확립",
        explanation: "회사의 취업규칙, 인사규정 등 다양한 내규가 단체협약과 충돌할 경우 현장의 혼란이 발생합니다. 본 조항은 단협을 최우선 기준으로 삼아 불필요한 다툼을 줄이고, 개별 근로계약으로 전체 기준을 저하시키는 것을 방지하기 위함입니다."
      },
      {
        id: "art2",
        title: "협약의 적용범위",
        content: "이 협약은 회사에 종사하는 모든 노동자에게 동등하게 적용한다.",
        summary: "모든 노동자에게 차별 없는 단협 적용",
        explanation: "직종, 직군, 고용형태에 따라 단협 적용을 배제하거나 선별적으로 적용하는 것을 방지하여, 노동자 간 형평성을 보장하고 전체 직원의 근로조건을 통일적으로 보호하기 위함입니다."
      },
      {
        id: "art3",
        title: "노동조건의 저하 금지",
        content: "회사는 이 협약에 규정되어 있지 않거나 누락되었다는 등의 이유로, 노조가 이미 확보하였거나 관행으로 보장되어 온 노조활동의 권리와 기존의 노동조건을 저하시킬 수 없다.",
        summary: "기존 관행 및 기득권 보호",
        explanation: "단협에 명시되지 않았다는 이유만으로 기존에 누리던 상여금, 휴가 관행 등을 회사가 일방적으로 축소하는 것을 막기 위한 안전장치입니다. 협약 체결이 오히려 노동조건 후퇴로 이어지는 것을 방지합니다."
      },
      {
        id: "art4",
        title: "규정의 개폐",
        content: "회사는 취업규칙을 비롯하여 근로조건과 관련된 조합원 및 직원에 관련된 제 규정, 규칙을 제정 또는 개정 · 폐지하고자 할 때에는 반드시 사전에 조합의 의견을 청취하여야 하며, 불이익한 변경에 해당할 경우에는 조합의 동의를 구해야 한다.",
        summary: "취업규칙 등 규정 변경 시 노조 개입 권한 보장",
        explanation: "회사가 일방적으로 규정을 변경하여 근로조건을 불리하게 만드는 것을 방지합니다. 사전 의견 청취와 불이익 변경 시 동의 절차를 명문화하여 절차적 정당성을 확보합니다."
      },
      {
        id: "art5",
        title: "기업의 사회적 책임 및 안전·환경 의무",
        content: "① 노사 쌍방은 기업이 사회적 책무를 다하고 사회 발전에 기여함으로써 전 직원이 보람과 긍지를 느끼며 일할 수 있는 일터를 만들고, 국민으로부터 신뢰받는 기업을 구현하기 위해 적극 노력한다.\n② 회사는 경영의 자율성·투명성·공정성을 제고하기 위하여 최선의 노력을 다하고, 조합과의 성실한 협력 관계 구축을 위해 필요한 정보를 성실히 공개한다.\n③ 회사는 안전사고 및 환경오염을 예방하기 위해 모든 조치를 강구하고, 산업안전보건법, 환경관련 법령 등 관계 법령을 준수하며, 조합과 협력하여 안전한 작업환경을 조성한다.",
        summary: "경영 투명성 제고 및 ESG 경영 실천",
        explanation: "화학소재 제조업 특성상 안전·환경 리스크가 큽니다. 회사가 정보를 독점하지 않고 노조와 공유함으로써 사고를 예방하고, 지역사회와 직원에게 신뢰받는 기업을 만들기 위한 조항입니다."
      }
    ]
  },
  {
    chapterId: "chapter2",
    chapterTitle: "제2장 조합활동 보장",
    icon: <Users className="w-5 h-5" />,
    clauses: [
      {
        id: "art_union_guarantee",
        title: "조합활동의 보장",
        content: "회사는 조합원의 정당하고 자유로운 조합 활동을 보장하고, 조합운영에 개입해서는 아니 되며, 조합 활동을 이유로 어떠한 불이익 처우도 하지 아니한다.",
        summary: "노조 자주성 침해 및 불이익 금지",
        explanation: "조합 활동은 법적으로 보장된 권리입니다. 관리자의 자의적인 활동 방해나 인사상 불이익을 사전에 차단하고, 안정적인 노사 관계의 기틀을 마련합니다."
      },
      {
        id: "art_activity_hours",
        title: "근무시간 중의 조합활동",
        content: "① 조합 활동은 근무시간 외에 행함을 원칙으로 하며, 다음 각 호에 해당하는 경우에는 참석 인원에 한하여 근무한 것으로 인정하고 유급으로 처리한다.\n1. 정기총회: 연 1일\n2. 대의원대회: 연 2일(임원 및 대의원)\n3. 회계감사: 연 2일(회계감사 2명 및 사무장 1명)\n4. 선거 시: 연 1일(선거관리위원 2명)\n5. 운영위원회 회의: 월 4시간(임원 및 집행부)\n6. 조합원 교육시간: 연 1인당 8시간(적치 또는 분할 사용 가능)\n7. 신입 조합원 교육시간: 4시간\n8. 기타 노사가 합의한 사항\n② 조합은 활동 사유, 참석자 명단, 일시를 사전에 문서로 회사에 통보하여야 한다.\n③ 인원수는 단체협약 체결 당시를 기준으로 하며, 특별한 사정 시 노사가 협의하여 조정한다.",
        summary: "필수 조합활동의 근무시간 인정(유급)",
        explanation: "총회, 대의원대회, 교육 등 필수적인 조합 활동 시간을 보장하여 노조 운영의 내실을 다지고, 조합원의 참여권을 실질적으로 보장하기 위함입니다."
      },
      {
        id: "art_promotion",
        title: "홍보활동 보장",
        content: "① 회사는 조합의 자유로운 사내 홍보활동을 보장한다.\n② 조합은 조합용 게시판을 설치할 수 있으며, 회사는 조합의 홍보물 게시·배포·현수막 부착 등을 방해하거나 제한하여서는 아니 된다.\n③ 조합은 조합 홍보활동을 위하여 회사의 사내 통신망(위컴 등)을 이용할 수 있다.",
        summary: "자유로운 소통과 알 권리 보장",
        explanation: "노조의 소식을 알리고 조합원과 소통하는 것은 노조 존립의 기초입니다. 사내 게시판, 통신망 이용을 보장하여 정보의 폐쇄성을 극복하고자 합니다."
      },
      {
        id: "art_biz_trip",
        title: "출장처리",
        content: "조합원이 근무시간 중 조합활동에 따라 근무지가 아닌 곳으로 출장을 가는 경우 이를 유급으로 인정하고, 불이익 처우를 하지 않는다.",
        summary: "상급단체 회의 등 외부 활동 보장",
        explanation: "상급단체 회의나 교육 등 외부 활동 참여 시 발생할 수 있는 근태 상의 불이익을 방지하고, 이를 정상적인 업무의 연장으로 인정받기 위함입니다."
      },
      {
        id: "art_timeoff",
        title: "조합대표자의 조합활동 및 처우 (타임오프)",
        content: "① 회사는 조합대표자의 업무 수행을 위하여 연 4,000시간의 근로시간면제(타임오프)를 보장하며, 사용 인원은 3명으로 한다.\n② 회사는 근로시간면제자의 활동을 전적으로 인정하며, 조합활동을 이유로 어떠한 불이익 처우도 해서는 아니 된다.\n③ 면제가 해제될 경우 원직복귀를 원칙으로 하며, 원직 소멸 시 동등 이상의 지위로 복귀시킨다.\n④ 조합활동 중 재해는 업무상 재해로 인정한다.",
        summary: "전임자 활동 시간(4,000시간) 및 신분 보장",
        explanation: "복수노조 체제하에서 전체 직원을 대변하고, 교섭·고충처리·산업안전 활동을 수행하기 위해서는 법정 한도 내 최대 시간 확보가 필수적입니다. 또한 전임 해제 후 불이익 없는 원직 복귀를 보장하여 활동의 안정성을 확보합니다."
      },
      {
        id: "art_checkoff",
        title: "조합비 등 일괄공제",
        content: "① 회사는 조합비를 매월 임금에서 일괄 공제하여 조합에 인도한다.\n② 조합은 조합원 변동사항이 있을 경우 회사에 통보한다.",
        summary: "조합비 공제 제도화(Check-off)",
        explanation: "조합비 납부 편의성을 높이고 회계 관리의 투명성을 확보하기 위해 급여 공제 방식을 채택합니다."
      },
      {
        id: "art_facility",
        title: "시설편의 제공",
        content: "① 회사는 조합 사무실, 집기, 비품을 제공하고 관리권을 노조에 부여한다.\n② 조합활동에 필요한 장소와 시설을 제공한다.\n③ 조합원의 사업장 출입을 보장한다.\n④ 정보통신망을 이용한 조합활동 감시를 금지한다.",
        summary: "노조 사무실 및 활동 공간 확보",
        explanation: "노조가 독립적인 조직으로 기능하기 위해서는 물리적 공간이 필수적입니다. 또한 전자적 감시를 금지하여 조합원의 자유로운 활동을 보호합니다."
      },
      {
        id: "art_info",
        title: "문서열람, 복사 및 자료제공",
        content: "① 취업규칙 및 제규정을 상시 공시한다.\n② 조합 요청 시 조합원 현황, 임금/노동조건 자료, 산업안전 자료, 경영상황 자료 등을 제공해야 한다.",
        summary: "정보 접근권 강화",
        explanation: "정보의 비대칭성을 해소하여 실질적인 대등 교섭을 가능하게 하고, 회사의 경영 상황을 투명하게 파악하기 위함입니다."
      },
      {
        id: "art_notice",
        title: "통지의무",
        content: "① 회사와 조합은 규정 제·개폐, 임원 변경, 조합원 변동, 조직 개편 등 주요 사항을 상호 문서로 통지한다.",
        summary: "상호 신뢰 구축을 위한 정보 공유",
        explanation: "노사 양측의 주요 변동 사항을 신속하게 공유하여 불필요한 오해를 줄이고 신뢰 관계를 유지하기 위한 기초 조항입니다."
      }
    ]
  },
  {
    chapterId: "chapter3",
    chapterTitle: "제3장 인사 및 징계",
    icon: <Briefcase className="w-5 h-5" />,
    clauses: [
      {
        id: "art_hr_principle",
        title: "인사권 행사 원칙",
        content: "① 조합 간부 인사는 사전에 조합과 합의한다.\n② 인사는 공정하고 객관적이어야 하며 적재적소 배치를 원칙으로 한다.\n③ 조합원 신분 등을 이유로 한 차별을 금지한다.\n④ 정당한 이유 없는 징벌을 금지한다.",
        summary: "인사권 남용 방지 및 노조 간부 보호",
        explanation: "인사권이 노조 탄압 수단으로 악용되는 것을 막고, 객관적 기준에 따른 인사를 통해 조합원의 고용 불안을 해소하기 위한 조항입니다."
      },
      {
        id: "art_hr_eval",
        title: "인사고과 제도 운영 및 공정성 보장",
        content: "① 인사고과 개편 시 노사합의해야 한다.\n② 인사고과 결과를 이유로 해고 등 불이익 조치를 하거나 임금과 연계해서는 안 된다.\n③ 평가 결과는 요청 시 공개하며, 이의제기 절차를 보장한다.",
        summary: "평가 제도의 투명성 및 불이익 활용 금지",
        explanation: "불투명한 평가 제도가 줄 세우기나 통제 수단으로 전락하는 것을 막고, 평가의 공정성과 수용성을 높이기 위함입니다."
      },
      {
        id: "art_recruit",
        title: "채용",
        content: "① 신규채용은 공개채용을 원칙으로 하며 절차를 투명하게 한다.\n② 비정규직, 경력직 등 특수 채용 시 사전에 노조와 합의한다.",
        summary: "채용 투명성 및 비정규직 채용 통제",
        explanation: "채용 비리를 예방하고, 무분별한 비정규직 채용을 노사가 함께 통제하여 고용 구조의 건전성을 유지합니다."
      },
      {
        id: "art_probation",
        title: "수습기간과 임시직의 사용제한",
        content: "① 수습기간은 3개월을 초과할 수 없으며 불이익을 주어선 안 된다.\n② 임시직 사용은 6개월 이내로 제한하며, 계속 고용 시 정규직으로 전환한다.",
        summary: "수습/임시직 남용 방지",
        explanation: "수습 기간을 악용한 노동 착취를 막고, 임시직의 반복 사용을 통한 상시 업무 비정규직화를 차단합니다."
      },
      {
        id: "art_retirement",
        title: "정년",
        content: "정년은 만 60세가 되는 해의 연말로 하며, 본인 희망 시 63세까지 연장할 수 있다.",
        summary: "정년 연장 및 고용 안정",
        explanation: "숙련된 노동자가 더 오래 일할 수 있도록 하여 노후 소득을 보장하고, 회사도 숙련 기술을 유지할 수 있도록 합니다."
      },
      {
        id: "art_reward",
        title: "표창 및 장기근속 포상",
        content: "① 공로자 등에 대해 표창한다.\n② 장기근속 포상: 5년(금5돈+3일), 10년(금10돈+5일), 15년(금15돈+10일), 20년(금20돈+15일), 이후 5년마다 추가 지급.",
        summary: "장기 근속에 대한 확실한 보상",
        explanation: "장기 근속자의 노고를 치하하고 애사심을 고취하여 인력 이탈을 방지하기 위한 실질적 보상책입니다."
      },
      {
        id: "art_promotion_step",
        title: "승급",
        content: "승급은 입사일 기준 매 1호봉씩 하며, 노사합의된 호봉표에 따른다.",
        summary: "호봉제 기반의 자동 승급 보장",
        explanation: "임금 인상이 회사의 자의적 판단이 아닌 근속에 따라 안정적으로 이루어지도록 합니다."
      },
      {
        id: "art_leave_absence",
        title: "휴직 및 복직",
        content: "① 업무 외 부상(16일~1년), 병역, 구속(12개월), 업무상 부상 등 휴직 사유 명시.\n② 복직 시 원직 복귀 원칙, 휴직기간 근속 인정.\n③ 휴직 만료 전 연장 가능.",
        summary: "휴직 사유 명문화 및 복직 권리 보장",
        explanation: "아프거나 불가피한 사정이 있을 때 해고 걱정 없이 쉴 수 있는 권리를 보장하고, 복직 시 불이익을 방지합니다."
      },
      {
        id: "art_unfair_labor",
        title: "부당노동행위",
        content: "회사는 부당노동행위를 해서는 안 되며, 판정 시 즉시 중지 및 보상 조치를 이행해야 한다. 재심 청구와 무관하게 초심 결정을 우선 따른다.",
        summary: "부당노동행위 엄단 및 신속 구제",
        explanation: "회사가 법적 절차를 지연시키며 노조를 탄압하는 것을 막고, 초심 판정만으로도 즉각적인 구제 조치를 시행하도록 강제합니다."
      },
      {
        id: "art_disciplinary",
        title: "징계 (사유, 절차, 위원회)",
        content: "① 징계 사유 명확화 및 입증책임 회사 부담.\n② 징계 종류: 경고, 견책, 출근정지(5일), 해고.\n③ 징계위원회 노사 동수 구성, 7일 전 통보, 소명기회 부여.\n④ 가부 동수 시 부결, 해고는 2/3 찬성 필요.\n⑤ 부당징계 판정 시 즉시 무효 및 임금 150% 지급, 소송비용 부담.",
        summary: "징계의 절차적/내용적 정당성 확보",
        explanation: "징계권 남용을 막기 위해 노사 동수 위원회와 엄격한 의결 정족수를 둡니다. 특히 부당해고 시 징벌적 배상(150%)을 명시하여 해고를 신중하게 하도록 유도합니다."
      }
    ]
  },
  {
    chapterId: "chapter4",
    chapterTitle: "제4장 고용안정",
    icon: <ShieldCheck className="w-5 h-5" />,
    clauses: [
      {
        id: "art_emp_committee",
        title: "고용안정위원회 설치",
        content: "노사 동수로 고용안정위원회를 설치하여 인력, 구조조정, 외주화 등 고용 관련 주요 사항을 심의·의결한다. 합의 사항은 단협과 동일한 효력을 갖는다.",
        summary: "고용 문제에 대한 노조의 결정권 확보",
        explanation: "경영진의 일방적인 고용 조정(해고, 외주화)을 막고, 노사가 함께 고용 안정을 위한 대책을 마련하기 위한 기구입니다."
      },
      {
        id: "art_emp_fund",
        title: "고용안정기금 조성",
        content: "매년 영업이익의 5%를 고용안정기금으로 적립하여 고용안정, 훈련 등에 사용한다.",
        summary: "위기 시 고용 유지를 위한 재원 마련",
        explanation: "경영 위기 시 인건비 절감을 이유로 해고하지 않도록 사전에 기금을 적립하여 고용 안전망을 구축합니다."
      },
      {
        id: "art_manpower",
        title: "적정인력 확보와 정원유지",
        content: "노사합의로 적정인력을 유지하며, 일방적 정원 축소를 금지한다. 노조가 정원 확대를 요구할 수 있으며 결원은 1개월 내 충원한다.",
        summary: "인력 부족 해소 및 노동강도 완화",
        explanation: "만성적인 인력 부족으로 인한 과로와 안전사고를 막기 위해 적정 인력을 유지하고 결원을 즉시 충원하도록 합니다."
      },
      {
        id: "art_temp_restrict",
        title: "비정규직(파견/용역/임시직) 제한",
        content: "① 파견·용역 도입 시 사전 합의, 정규직 업무 대체 금지.\n② 임시직 사용 제한, 상시 업무 정규직 전환.\n③ 비정규직에 대한 차별 처우 금지.",
        summary: "비정규직 남용 방지 및 정규직화 원칙",
        explanation: "비정규직 확대를 막아 고용의 질을 높이고, 동일 노동 동일 임금 원칙을 실현하기 위함입니다."
      },
      {
        id: "art_layoff",
        title: "경영상 이유에 의한 해고(정리해고) 제한",
        content: "① 긴박한 경영상 필요 엄격 해석.\n② 해고 회피 노력 의무화 (노동시간 단축, 순환휴직 등).\n③ 해고 대상자 선정 기준 노사 합의.\n④ 50일 전 통보 및 성실 협의.\n⑤ 해고 후 3년 내 우선 재고용.",
        summary: "정리해고 요건 강화로 고용 보호",
        explanation: "정리해고를 최후의 수단으로 만들고, 불가피한 경우에도 공정한 절차와 재고용 권리를 보장하여 노동자의 생존권을 지킵니다."
      },
      {
        id: "art_subcontract",
        title: "외주 및 하도급",
        content: "외주/하도급 전환 시 사전에 노조와 합의하며, 물량 축소 시 외주 물량부터 우선 조정한다.",
        summary: "무분별한 외주화 통제",
        explanation: "외주화로 인한 정규직 일자리 감소를 막고, 생산량 변동 시 정규직의 고용을 우선 보호하기 위함입니다."
      },
      {
        id: "art_training",
        title: "교육훈련",
        content: "신규채용, 전환배치 시 교육을 의무화하며, 교육시간은 근무로 인정하고 비용은 회사가 부담한다.",
        summary: "직무 능력 향상 및 안전 교육 보장",
        explanation: "직무 변경 시 충분한 교육을 통해 업무 적응을 돕고, 안전사고를 예방하기 위함입니다."
      },
      {
        id: "art_foreign_worker",
        title: "외국인 노동자 처우",
        content: "외국인 채용 시 노조 합의, 내국인 대체 금지, 차별 금지, 관련 정보 제공.",
        summary: "내국인 역차별 방지 및 외국인 차별 금지",
        explanation: "외국인 노동자 채용이 정규직 일자리를 위협하지 않도록 하고, 동일한 노동 조건에서 일할 수 있도록 보호합니다."
      }
    ]
  },
  {
    chapterId: "chapter5",
    chapterTitle: "제5장 임금",
    icon: <Coins className="w-5 h-5" />,
    clauses: [
      {
        id: "art_wage_def",
        title: "임금의 정의와 구성",
        content: "① 통상임금: 기본급 + 정기적·일률적 수당(명절비, 식대, 직책수당 등). 월 209시간 기준.\n② 평균임금: 통상임금 + 초과수당, 성과급 등 일체.",
        summary: "통상임금 범위 확대로 수당 현실화",
        explanation: "각종 수당을 통상임금에 포함시켜 연장·야간·휴일 수당의 기준 금액을 높이고, 법적 분쟁 소지를 없앱니다."
      },
      {
        id: "art_allowance",
        title: "제수당",
        content: "가족수당(2만), 자격수당, 직책수당, 생산장려수당(5만), 근속수당(2년 1만~최대 10만) 등 지급.",
        summary: "생활 보조 및 동기 부여 수당 명문화",
        explanation: "회사의 재량에 맡기던 수당을 단협에 명시하여 지급을 의무화하고 조합원의 실질 소득을 보전합니다."
      },
      {
        id: "art_incentive",
        title: "상여금 및 성과급",
        content: "영업이익의 10%를 전 조합원 균등 배분. 퇴직자에게도 일할 계산 지급.",
        summary: "성과 공유제 명문화",
        explanation: "회사의 이익을 투명하게 공개하고 공정하게 배분하여, 노동의 대가를 정당하게 인정받고자 합니다."
      },
      {
        id: "art_wage_cut",
        title: "임금저하 불가 및 임금인상",
        content: "① 배치전환, 근무형태 변경 등을 이유로 임금 저하 금지.\n② 매년 1월 1일부로 임금 인상, 인상률은 임금협상에 따름.",
        summary: "임금 삭감 방지 및 매년 인상 원칙",
        explanation: "경영 사정이나 직무 변경을 핑계로 임금을 깎는 것을 원천 봉쇄하고, 매년 물가 상승분을 반영한 임금 인상을 보장받습니다."
      },
      {
        id: "art_wage_etc",
        title: "지급일, 공제금지, 비상시 지급, 휴업수당",
        content: "① 매월 10일 전액 지급.\n② 동의 없는 임의 공제 금지.\n③ 관혼상제 등 비상시 가불 지급.\n④ 휴업 시 평균임금 70% 이상 지급.",
        summary: "임금 지급의 안정성 확보",
        explanation: "임금 체불이나 임의 공제를 막고, 비상 상황이나 회사 귀책 휴업 시에도 최소한의 생계를 유지할 수 있도록 합니다."
      }
    ]
  },
  {
    chapterId: "chapter6",
    chapterTitle: "제6장 노동시간·휴일·휴가",
    icon: <Clock className="w-5 h-5" />,
    clauses: [
      {
        id: "art_work_time",
        title: "노동시간",
        content: "① 주 40시간 원칙, 준비/정리/교육/회식 등 지휘·감독 하의 모든 시간 포함.\n② 교대근무표 변경 시 합의.\n③ 주 52시간 초과 금지 및 시간 기록 투명화.",
        summary: "공짜 노동 근절 및 노동시간 정의 명확화",
        explanation: "작업 준비, 청소, 교육 시간도 노동시간으로 인정받아 무급 노동을 없애고, 장시간 노동을 규제합니다."
      },
      {
        id: "art_flex_time",
        title: "노동시간 변경(탄력근로 등) 제한",
        content: "유연근무제 도입 시 반드시 노조 합의 필요. 임금 저하 금지, 11시간 연속 휴식 보장.",
        summary: "변형 근로시간제 일방 도입 차단",
        explanation: "회사가 비용 절감을 위해 탄력근로제 등을 일방적으로 도입하여 수당을 깎거나 건강권을 침해하는 것을 막습니다."
      },
      {
        id: "art_overtime",
        title: "연장·야간·휴일 노동 수당",
        content: "연장/야간/휴일 150%, 휴일 연장 200%, 명절 근로 200%(연장 시 250%) 지급.",
        summary: "중복 할증 인정 및 명절 근로 보상 강화",
        explanation: "휴일 근무와 명절 근무에 대한 확실한 보상을 통해 쉴 권리를 강화하고 불가피한 근무에 대한 정당한 대가를 받습니다."
      },
      {
        id: "art_holidays",
        title: "유급휴일 및 휴가",
        content: "① 법정공휴일, 노동절, 창립/노조기념일 유급휴일.\n② 하계휴가 3일 + 휴가비 50만원.\n③ 연차: 법정 기준 + 3년 근속 시 2년마다 1일 가산. 미사용 수당 150% 지급.",
        summary: "휴식권 확대 및 하계휴가비 신설",
        explanation: "충분한 휴식을 통해 노동력을 재생산하고, 연차 사용을 촉진하되 미사용 시에는 징벌적 수당(150%)을 지급하여 휴가 사용을 유도합니다."
      },
      {
        id: "art_special_leave",
        title: "특별휴가(경조사) 및 병가/공가",
        content: "① 경조휴가 및 경조금 지급 (결혼, 사망 등).\n② 병가: 유급 보장(기간별 차등), 불이익 금지.\n③ 공가: 예비군, 투표, 천재지변 등. 야간근무자 예비군 훈련 시 당일 야간 유급 휴무 보장.",
        summary: "아플 때 쉴 권리 및 사회적 의무 수행 보장",
        explanation: "개인적 경조사나 질병 시 생계 걱정 없이 쉴 수 있도록 하고, 예비군 훈련 후 야간근무를 면제하여 안전을 보장합니다."
      }
    ]
  },
  {
    chapterId: "chapter7",
    chapterTitle: "제7장 남녀평등·모성보호",
    icon: <Heart className="w-5 h-5" />,
    clauses: [
      {
        id: "art_gender_eq",
        title: "남녀평등과 모성보호",
        content: "고용 전 과정에서 성차별 금지. 차별 판정 시 즉시 시정 및 원상회복.",
        summary: "성차별 없는 일터 조성",
        explanation: "채용부터 퇴직까지 성별에 따른 불이익을 없애고, 차별 발생 시 신속한 구제를 의무화합니다."
      },
      {
        id: "art_parental_leave",
        title: "육아휴직",
        content: "① 자녀당 1년(부모 합산 2년), 3회 분할 가능.\n② 복직 보장 및 불이익 금지(근속 인정, 직책 유지).\n③ 신청 절차 간소화.",
        summary: "눈치 보지 않는 육아휴직 보장",
        explanation: "육아휴직이 경력 단절이나 인사상 불이익으로 이어지지 않도록 강력한 보호 장치를 마련합니다."
      },
      {
        id: "art_night_work",
        title: "야간근로 금지",
        content: "여성 조합원 야간근로 원칙적 금지(동의+인가 필요), 임신부 절대 금지.",
        summary: "모성 보호를 위한 야간 노동 제한",
        explanation: "건강에 해로운 야간 노동으로부터 여성, 특히 임신부를 보호하기 위한 조항입니다."
      }
    ]
  },
  {
    chapterId: "chapter8",
    chapterTitle: "제8장 노동안전보건",
    icon: <ShieldCheck className="w-5 h-5" />,
    clauses: [
      {
        id: "art_safety_principle",
        title: "노동안전보건 원칙",
        content: "안전제일 원칙 명시, 미확인 위험까지 조사·개선, 비정규직 포함 일괄 적용.",
        summary: "안전을 경영 최우선 가치로 설정",
        explanation: "모든 노동자가 안전하게 일할 권리를 보장하고, 회사의 포괄적인 안전 책임을 명시합니다."
      },
      {
        id: "art_safety_comm",
        title: "산업안전보건위원회(산보위)",
        content: "노사 동수 구성, 분기별 개최. 합의 사항 단협 효력 인정. 활동 시간 유급 보장.",
        summary: "안전 문제에 대한 노조의 실질적 참여",
        explanation: "회사의 일방적인 안전 관리가 아닌, 현장 노동자가 참여하는 산보위를 통해 실질적인 위험 요소를 제거합니다."
      },
      {
        id: "art_safety_manager",
        title: "안전보건관리자 및 명예감독관",
        content: "관리자 임면 시 산보위 의결, 실질적 권한 부여. 명예산업안전감독관 활동 시간 유급 보장 및 불이익 금지.",
        summary: "안전 관리자의 권한 강화 및 현장 감시 활동 보장",
        explanation: "형식적인 안전 관리자가 아닌 실권을 가진 관리자를 두고, 현장 노동자가 직접 안전을 감시할 수 있도록 지원합니다."
      },
      {
        id: "art_safety_edu_rule",
        title: "안전보건규정 및 교육",
        content: "규정 제정 시 산보위 의결. 정기/채용/배치전환 교육 유급 실시.",
        summary: "현장에 맞는 규정 제정 및 교육 의무화",
        explanation: "현장 실정에 맞는 안전 수칙을 만들고, 충분한 교육을 통해 사고를 예방합니다."
      },
      {
        id: "art_safety_right",
        title: "작업중지권",
        content: "급박한 위험 시 작업 중지 및 대피 권리 보장. 이로 인한 불이익 금지. 작업 재개 시 노사 합의 필요.",
        summary: "위험 시 거부할 권리(생명권) 보장",
        explanation: "생산보다 안전이 우선입니다. 노동자가 위험을 감지하면 즉시 작업을 멈출 수 있는 권한을 보장하여 중대재해를 예방합니다."
      },
      {
        id: "art_safety_env",
        title: "작업환경측정 및 건강진단",
        content: "① 측정/검진 시 노조 참여 보장, 비용 전액 회사 부담.\n② 유해 요인 발견 시 즉시 개선.\n③ 특수검진, 종합검진(2년 1회, 40세↑ 매년) 실시.",
        summary: "직업병 예방을 위한 선제적 관리",
        explanation: "작업장의 유해 요인을 투명하게 측정하고, 정기적인 정밀 검진을 통해 직업병을 조기에 발견하고 예방합니다."
      },
      {
        id: "art_ind_accident",
        title: "산업재해 인정 및 보상",
        content: "① 공단 불승인 시에도 회사 책임 시 동일 보상.\n② 산재 요양 기간 근속 인정 및 추가 보상(급여 차액 등).\n③ 원직 복귀 및 경미 작업 전환 보장.",
        summary: "산재 노동자 보호 강화",
        explanation: "산재 발생 시 치료와 생계를 회사가 책임지도록 하고, 건강하게 현장에 복귀할 수 있도록 지원합니다."
      },
      {
        id: "art_safety_etc",
        title: "기타 안전 조치",
        content: "안전보호구 지급, MSDS(물질안전보건자료) 비치 및 교육, 근골격계/뇌심혈관계 질환 예방 프로그램 운영.",
        summary: "현장 밀착형 안전 관리",
        explanation: "보호구 지급부터 유해물질 관리까지 현장의 구석구석을 안전하게 관리하기 위한 세부 조항들입니다."
      }
    ]
  },
  {
    chapterId: "chapter9",
    chapterTitle: "제9장 복지후생",
    icon: <Heart className="w-5 h-5" />,
    clauses: [
      {
        id: "art_welfare_club",
        title: "동호회 활동",
        content: "활동비 월 20만원 한도 내 실비 지원.",
        summary: "여가 활동 지원",
        explanation: "직원들의 취미 생활과 친목 도모를 지원하여 활기찬 직장 분위기를 만듭니다."
      },
      {
        id: "art_welfare_house",
        title: "숙소 지원금",
        content: "충주 인근 전입자 월 33만원 지급 (최대 3년).",
        summary: "주거 안정 지원",
        explanation: "타 지역 출신 직원의 주거비 부담을 덜어주어 안정적인 정착을 돕습니다."
      },
      {
        id: "art_welfare_holiday",
        title: "명절 귀향비 및 가산수당",
        content: "① 설/추석 귀향비 30만원.\n② 명절 근무 시 특별 가산수당(운용직 7만/일, 관리직 10~15만/일) + 법정수당 별도.",
        summary: "명절 복지 강화",
        explanation: "명절을 맞아 직원들을 격려하고, 남들 쉴 때 일하는 직원에게 확실한 보상을 제공합니다."
      },
      {
        id: "art_insurance",
        title: "단체상해보험",
        content: "전 조합원 대상 가입, 보험료 회사 부담. 보장 내용 축소 금지.",
        summary: "업무 외 재해에 대한 안전망",
        explanation: "업무 외 사고나 질병에 대해서도 혜택을 받을 수 있는 보험을 통해 직원과 가족의 생활 안정을 도모합니다."
      }
    ]
  },
  {
    chapterId: "chapter10",
    chapterTitle: "제10장 단체교섭",
    icon: <FileText className="w-5 h-5" />,
    clauses: [
      {
        id: "art_bargaining",
        title: "단체교섭 (대상, 절차, 의무)",
        content: "① 교섭 대상 포괄적 인정.\n② 교섭 요구 시 성실 응낙 의무.\n③ 노사 각 4명 교섭위원 구성, 대표위원 의무 참석.\n④ 합의서 작성 및 전체 서명.",
        summary: "성실 교섭 의무화",
        explanation: "회사가 교섭을 회피하거나 지연시키지 못하도록 절차를 명확히 하고, 대표자가 직접 나와 책임 있는 답변을 하도록 합니다."
      },
      {
        id: "art_council_bargain",
        title: "교섭 진행 (간사, 회의록)",
        content: "노사 간사 선임, 회의록 작성 및 서명.",
        summary: "교섭 투명성 확보",
        explanation: "교섭 내용을 정확히 기록하여 추후 발생할 수 있는 이견을 방지합니다."
      }
    ]
  },
  {
    chapterId: "chapter11",
    chapterTitle: "제11장 노사협의회",
    icon: <MessageCircle className="w-5 h-5" />,
    clauses: [
      {
        id: "art_council",
        title: "노사협의회 운영",
        content: "① 노사 동수, 분기별 정기회의.\n② 경영계획 등 보고 의무.\n③ 인사/채용/복지 등 협의·의결.\n④ 의결 사항 단협 효력 인정.",
        summary: "상시적 노사 소통 채널 가동",
        explanation: "교섭 기간 외에도 일상적인 경영 현안과 고충을 논의할 수 있는 기구를 내실 있게 운영합니다."
      }
    ]
  },
  {
    chapterId: "chapter12",
    chapterTitle: "제12장 노동쟁의",
    icon: <AlertTriangle className="w-5 h-5" />,
    clauses: [
      {
        id: "art_dispute",
        title: "노동쟁의 원칙 및 신분보장",
        content: "① 평화적 해결 노력하되 쟁의권 보장.\n② 쟁의 기간 중 징계 등 불이익 금지.\n③ 쟁의 종료 후 보복 금지.",
        summary: "정당한 쟁의권 보호",
        explanation: "헌법이 보장한 단체행동권을 행사했다는 이유로 인사상 불이익을 당하지 않도록 보호합니다."
      },
      {
        id: "art_replace_ban",
        title: "대체근로 및 외주화 금지",
        content: "쟁의 기간 중 대체인력 투입, 신규 채용, 도급 전환 등 쟁의 무력화 행위 금지.",
        summary: "쟁의권 무력화 방지",
        explanation: "회사가 대체인력을 투입하여 파업의 효과를 없애려는 시도를 막아 쟁의권의 실효성을 보장합니다."
      },
      {
        id: "art_emergency",
        title: "비상시 조치",
        content: "천재지변 등 비상시 쟁의 중지 및 재해 수습 협조.",
        summary: "공익과 안전 우선",
        explanation: "국가적 재난이나 중대 재해 발생 시에는 노사가 힘을 합쳐 위기를 극복합니다."
      }
    ]
  },
  {
    chapterId: "chapter13",
    chapterTitle: "제13장 부칙",
    icon: <Bookmark className="w-5 h-5" />,
    clauses: [
      {
        id: "art_addenda",
        title: "부칙 (유효기간 등)",
        content: "① 유효기간 1년 (최초 2026.12.31까지).\n② 기간 만료 후에도 갱신 전까지 효력 유지.\n③ 불리한 해석 시 노조 유리하게 적용.",
        summary: "협약의 안정적 효력 유지",
        explanation: "협약 만료 후에도 '무협약 상태'가 되지 않도록 하여 노동조건을 지속적으로 보호합니다."
      }
    ]
  }
];

// --- COMPONENTS ---

const Header = ({ toggleSidebar }) => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4 shadow-sm">
    <button onClick={toggleSidebar} className="p-2 mr-4 md:hidden text-gray-600 hover:bg-gray-100 rounded-md">
      <Menu size={24} />
    </button>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3 shadow-sm">
        JS
      </div>
      <div>
        <h1 className="text-lg font-bold text-slate-800 leading-tight">전국화학섬유식품산업노동조합</h1>
        <p className="text-sm text-slate-500 font-medium">JS에너지지회 단체협약 요구안 (확정판)</p>
      </div>
    </div>
  </header>
);

const Sidebar = ({ isOpen, closeSidebar, activeChapter, scrollToChapter }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar Content */}
      <aside className={`
        fixed top-16 left-0 bottom-0 w-72 bg-slate-50 border-r border-gray-200 z-40
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
            단협안 목차
          </h2>
          <nav className="space-y-1">
            {agreementData.map((chapter) => (
              <button
                key={chapter.chapterId}
                onClick={() => scrollToChapter(chapter.chapterId)}
                className={`
                  w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors text-left
                  ${activeChapter === chapter.chapterId 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-white hover:shadow-sm'}
                `}
              >
                <span className={`mr-3 ${activeChapter === chapter.chapterId ? 'text-blue-600' : 'text-gray-400'}`}>
                  {chapter.icon}
                </span>
                <span className="truncate">{chapter.chapterTitle}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 mt-4 border-t border-gray-200">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <h3 className="text-sm font-bold text-orange-800 mb-1">📢 핵심 기조</h3>
            <p className="text-xs text-orange-700 leading-relaxed">
              본 안은 <strong>법적 안정성</strong>, <strong>고용안정</strong>, <strong>실질임금보장</strong>, <strong>안전한 일터</strong>를 핵심 가치로 합니다.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

const ClauseCard = ({ clause }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      {/* Header / Clause Title */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-slate-800 mb-2 break-keep">{clause.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap ml-2">
            요구안
          </span>
        </div>
        <p className="text-gray-700 font-serif leading-relaxed whitespace-pre-line text-base bg-gray-50 p-4 rounded-lg border border-gray-100">
          {clause.content}
        </p>
      </div>

      {/* Accordion Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-3 text-sm font-medium transition-colors
          ${isOpen ? 'bg-blue-50 text-blue-700 border-b border-blue-100' : 'bg-white text-gray-500 hover:bg-gray-50'}
        `}
      >
        <span className="flex items-center">
          <Info className="w-4 h-4 mr-2" />
          {isOpen ? '해설 닫기' : '💡 제안 배경 및 해설 보기 (Why?)'}
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Expanded Content (Explanation) */}
      {isOpen && (
        <div className="bg-blue-50/50 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-4">
            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
              핵심 요지
            </h4>
            <p className="text-gray-900 font-bold text-sm ml-3.5 break-keep">
              {clause.summary}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span>
              상세 해설
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed ml-3.5 whitespace-pre-line break-keep">
              {clause.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(agreementData[0].chapterId);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const scrollToChapter = (chapterId) => {
    const element = document.getElementById(chapterId);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setActiveChapter(chapterId);
      setIsSidebarOpen(false); // Close sidebar on mobile after click
    }
  };

  // Intersection Observer to update active chapter on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10% 0px -80% 0px" }
    );

    agreementData.forEach((chapter) => {
      const element = document.getElementById(chapter.chapterId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header toggleSidebar={toggleSidebar} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={() => setIsSidebarOpen(false)} 
        activeChapter={activeChapter}
        scrollToChapter={scrollToChapter}
      />

      {/* Main Content */}
      <main className="pt-16 md:pl-72 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
          
          {/* Intro Section */}
          <div className="mb-10 text-center md:text-left animate-in fade-in duration-500">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4 break-keep">
              단체협약 요구안 및 해설서
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 break-keep">
              본 문서는 <span className="font-bold text-orange-600">JS에너지지회</span>가 기업노조(교섭대표노조)에게 지회 요구안으로 전달한
              단체협약안의 핵심내용과 각 조항별 제안 배경을 담고 있습니다. 
              <br className="hidden md:inline" />
              아래의 각 조항을 클릭하여 상세한 해설을 확인하십시오.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-600 font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              최종 수정일: 2025. 11. 25
            </div>
          </div>

          {/* Chapters Loop */}
          <div className="space-y-16">
            {agreementData.map((chapter) => (
              <section key={chapter.chapterId} id={chapter.chapterId} className="scroll-mt-24">
                <div className="flex items-center mb-6 pb-2 border-b-2 border-slate-200">
                  <div className="p-2 bg-slate-800 text-white rounded-lg mr-3 shadow-md">
                    {chapter.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                    {chapter.chapterTitle}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {chapter.clauses.map((clause) => (
                    <ClauseCard key={clause.id} clause={clause} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-20 py-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p className="mb-2 font-bold">전국화학섬유식품산업노동조합 JS에너지지회</p>
            <p>Copyright © 2025 KCTU JS Energy Branch. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

