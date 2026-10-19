'use strict';

// Each field: stable key, output heading, helper text, placeholder, example.
// Add fields here to extend both the form and generated prompt together.
const MODES = {
  user: {
    title: '사용자 프롬프트',
    description: '과제, 발표, 시험 공부 중 어떤 도움이 필요한가요? 요청부터 적고, 수업 상황과 조건을 더해보세요.',
    basic: 3,
    fields: [
      ['request', '요청', 'AI에게 도움받고 싶은 구체적인 작업을 적어주세요.', '예: 생성형 AI의 장단점을 다루는 5분 발표 개요를 만들어 주세요.', '생성형 AI가 대학생의 학습에 미치는 장점과 한계를 다루는 5분 발표 개요를 만들어 주세요.'],
      ['role', '역할', '어떤 분야의 전문가로 답하면 좋을까요?', '예: 대학생의 발표 준비를 돕는 발표 코치', '당신은 대학생의 발표 준비를 돕는 발표 코치입니다.'],
      ['context', '맥락', '수업, 과제 조건, 현재 이해 수준을 알려주세요.', '예: AI 교양 수업에서 처음 개인 발표를 준비하는 대학생', '저는 AI 교양 수업을 듣는 대학생입니다. 생성형 AI를 처음 배우고 있으며, 같은 수업을 듣는 학생들 앞에서 개인 발표를 준비하고 있습니다.'],
      ['goal', '목적', '이 작업을 통해 배우거나 완성하고 싶은 것은 무엇인가요?', '예: AI의 장단점을 이해하고 내 말로 설명하기', '생성형 AI의 장점과 한계를 이해하고, 일상적인 사례를 들어 제 말로 설명하고 싶습니다.'],
      ['format', '출력 형식', '과제나 학습에 맞는 구조와 분량을 정해주세요.', '예: 도입·본론·마무리, 시간 배분과 핵심 내용을 표로 정리', '도입, 본론, 마무리로 나누고 각 부분의 시간 배분, 핵심 내용, 사용할 사례를 표로 정리해 주세요.'],
      ['constraints', '제약 조건', '발표 시간, 과제 조건 등 지켜야 할 기준을 적어주세요.', '예: 총 5분, 어려운 용어는 쉽게 설명, 확인할 정보는 표시', '총 발표 시간은 5분입니다. 어려운 용어는 쉽게 설명하고, 근거 확인이 필요한 정보는 따로 표시해 주세요.'],
    ],
    order: ['role', 'context', 'goal', 'request', 'format', 'constraints']
  },
  system: {
    title: '개인 맞춤 설정',
    description: '나의 전공과 학습 방식에 맞는 기본 응답을 설정해보세요. 개인 맞춤 설정의 적용 위치와 허용 분량은 AI 서비스마다 다릅니다.',
    basic: 3,
    fields: [
      ['profile', '사용자 소개', '전공, 관심 분야, 현재 학습 수준을 알려주세요.', '예: AI 교양 수업을 듣는 대학교 1학년, 코딩 경험 없음', '저는 AI 교양 수업을 듣는 대학교 1학년입니다. 코딩 경험은 없고, 과제와 발표 준비에 AI를 활용하는 방법에 관심이 있습니다.'],
      ['role', 'AI의 역할', '공부할 때 어떤 도움을 받길 원하나요?', '예: 개념 이해와 스스로 문제 해결하기를 돕는 학습 튜터', '개념 이해와 스스로 문제 해결하기를 돕는 학습 튜터로 응답해 주세요.'],
      ['tone', '말투', '선호하는 언어와 대화 분위기를 정해주세요.', '예: 한국어 존댓말, 친근하고 간결한 표현', '한국어 존댓말로 친근하고 간결하게 답해 주세요.'],
      ['depth', '설명 수준', '어느 정도의 깊이와 예시가 필요한가요?', '예: 기초부터 단계별로 설명하고 대학 생활 속 예시 포함', '기초부터 단계별로 설명하고, 낯선 개념에는 대학 생활에서 접할 수 있는 예시를 하나 포함해 주세요.'],
      ['principles', '응답 원칙', '학습에 도움이 되는 답변 방식을 정해주세요.', '예: 풀이 힌트부터 제시하고, 설명 뒤에 이해 확인 질문 추가', '문제 풀이를 요청하면 먼저 접근 방법과 힌트를 알려주세요. 개념을 설명한 뒤에는 제가 이해했는지 확인할 짧은 질문을 하나 해주세요. 사실과 추정을 구분해 주세요.'],
      ['avoid', '피해야 할 방식', '공부할 때 도움이 되지 않는 답변 방식을 적어주세요.', '예: 설명 없이 정답만 제시하기, 전문 용어를 풀이 없이 사용하기', '설명 없이 정답만 제시하거나 전문 용어를 풀이 없이 사용하지 마세요. 확인되지 않은 자료나 출처를 만들어내지 마세요.']
    ]
  },
  project: {
    title: '프로젝트 작업 지침',
    description: '팀 과제나 장기 프로젝트에서 지킬 기준을 정해보세요. 팀원과 AI가 함께 참고할 수 있는 작업 지침이 됩니다.',
    basic: 3,
    fields: [
      ['overview', '프로젝트 소개', '어떤 수업에서 어떤 과제를 진행하나요?', '예: AI 교양 수업의 팀 과제 — 대학생의 AI 활용 사례 조사', 'AI 교양 수업에서 4인 팀으로 대학생의 생성형 AI 활용 사례를 조사하고 발표하는 프로젝트입니다.'],
      ['goal', '목표', '최종적으로 완성할 결과물과 학습 목표를 적어주세요.', '예: 활용 사례 3개를 비교하고 10분 팀 발표 준비', '학습, 일상, 진로 탐색의 활용 사례를 각 1개씩 비교하고, 장점과 한계를 설명하는 10분 팀 발표를 완성합니다.'],
      ['audience', '대상 독자', '누가 발표를 듣거나 결과물을 읽나요?', '예: 같은 교양 수업을 듣는 학생들과 담당 교수님', '같은 교양 수업을 듣는 학생들과 담당 교수님입니다. AI 배경 지식이 적은 학생도 이해할 수 있어야 합니다.'],
      ['scope', '작업 범위', '조사할 내용과 제외할 내용을 적어주세요.', '예: 무료 AI 도구 활용 사례 포함, 유료 기능과 전문 개발 내용 제외', '무료로 이용할 수 있는 AI 도구의 활용 사례와 결과 검증 방법을 다룹니다. 유료 전용 기능과 전문적인 프로그램 개발은 제외합니다.'],
      ['process', '작업 절차', '팀원들과 어떤 순서로 조사하고 검토할까요?', '예: 역할 분담 → 사례 조사 → 출처 확인 → 슬라이드 제작 → 발표 연습', '팀원별 역할을 나누고 사례를 조사합니다. 조사 내용과 출처를 함께 확인한 뒤 슬라이드를 만들고, 시간을 재며 발표를 연습합니다.'],
      ['format', '결과물 규격', '발표 시간, 슬라이드 수, 필수 구성을 정해주세요.', '예: 10분 발표, 슬라이드 8장, 마지막 장에 참고 자료 정리', '발표는 10분, 슬라이드는 8장으로 구성합니다. 주제 소개, 사례 비교, 장점과 한계, 결론을 포함하고 마지막 장에는 참고 자료를 정리합니다.'],
      ['review', '검토 기준', '제출 전에 무엇을 확인해야 하나요?', '예: 평가 기준 충족, 출처 정확성, 발표 시간, 팀원별 내용 중복', '과제 평가 기준을 충족하는지, 출처가 정확한지, 발표가 10분 안에 끝나는지, 팀원별 내용이 불필요하게 중복되지 않는지 확인합니다.']
    ]
  }
};

const drafts = Object.fromEntries(Object.keys(MODES).map(key => [key, {}]));
const expanded = {};
let mode = 'user';
let toastTimer;
const $ = id => document.getElementById(id);
const tabs = [...document.querySelectorAll('[role="tab"]')];

function buildPrompt(key = mode) {
  const config = MODES[key];
  const ordered = config.order ? config.order.map(id => config.fields.find(field => field[0] === id)) : config.fields;
  return ordered.filter(([id]) => drafts[key][id]?.trim()).map(([id, label]) => `[${label}]\n${drafts[key][id].trim()}`).join('\n\n');
}

function updatePreview() {
  const text = buildPrompt();
  $('output').textContent = text;
  $('output').hidden = !text;
  $('empty-state').hidden = Boolean(text);
  $('copy').disabled = !text;
  $('field-count').textContent = `${MODES[mode].fields.filter(([id]) => drafts[mode][id]?.trim()).length}개 항목`;
  $('character-count').textContent = `${Array.from(text).length.toLocaleString('ko-KR')}자`;
  $('select-output').hidden = true;
  $('copy-help').textContent = mode === 'user' ? '복사한 내용을 사용하는 AI의 입력창에 붙여넣으세요.' : mode === 'system' ? '사용하는 AI의 개인 맞춤 설정에 붙여넣으세요.' : '사용하는 AI의 프로젝트 지침에 붙여넣으세요.';
}

function createField([id, label, hint, placeholder], index) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const fieldId = `${mode}-${id}`;
  const labelNode = document.createElement('label');
  labelNode.htmlFor = fieldId;
  labelNode.textContent = label;
  const helper = document.createElement('p');
  helper.className = 'field-hint';
  helper.id = `${fieldId}-hint`;
  helper.textContent = hint;
  const input = document.createElement('textarea');
  input.id = fieldId;
  input.name = id;
  input.rows = index === 0 ? 3 : 2;
  input.placeholder = placeholder;
  input.value = drafts[mode][id] || '';
  input.setAttribute('aria-describedby', helper.id);
  input.addEventListener('input', () => {
    drafts[mode][id] = input.value;
    updatePreview();
  });
  wrapper.append(labelNode, helper, input);
  return wrapper;
}

function render() {
  const config = MODES[mode];
  tabs.forEach(tab => {
    const active = tab.dataset.mode === mode;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $('workspace').setAttribute('aria-labelledby', `tab-${mode}`);
  $('editor-title').textContent = config.title;
  $('mode-description').textContent = config.description;
  $('prompt-form').replaceChildren();
  config.fields.slice(0, config.basic).forEach((field, index) => $('prompt-form').append(createField(field, index)));
  const details = document.createElement('details');
  details.open = Boolean(expanded[mode]);
  const summary = document.createElement('summary');
  summary.textContent = '추가 항목';
  const hint = document.createElement('span');
  hint.textContent = `${config.fields.length - config.basic}개 · 필요한 만큼 더 구체적으로`;
  summary.append(hint);
  details.append(summary);
  config.fields.slice(config.basic).forEach((field, index) => details.append(createField(field, index + config.basic)));
  const renderedMode = mode;
  details.addEventListener('toggle', () => { expanded[renderedMode] = details.open; });
  $('prompt-form').append(details);
  if (mode === 'user' || mode === 'project') {
    const referenceNote = document.createElement('p');
    referenceNote.className = 'field-hint';
    referenceNote.textContent = '참고 자료 파일은 실제 생성형 AI의 채팅창에 첨부하세요.';
    $('prompt-form').append(referenceNote);
  }
  updatePreview();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => { mode = tab.dataset.mode; render(); });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].click();
    tabs[next].focus();
  });
});
$('prompt-form').addEventListener('submit', event => event.preventDefault());

function notify(message) {
  clearTimeout(toastTimer);
  $('status').textContent = message;
  toastTimer = setTimeout(() => { $('status').textContent = ''; }, 4500);
}

async function confirmReplace(action) {
  if (!Object.values(drafts[mode]).some(value => value.length)) return true;
  $('confirm-title').textContent = action === 'example' ? '예시로 바꿀까요?' : '작성 내용을 지울까요?';
  $('confirm-description').textContent = `현재 ${MODES[mode].title}의 작성 내용${action === 'example' ? '이 예시로 바뀝니다.' : '이 모두 삭제됩니다.'} 다른 메뉴의 내용은 유지됩니다. 이 작업은 되돌릴 수 없습니다.`;
  $('confirm-action').textContent = action === 'example' ? '예시 불러오기' : '초기화';
  const dialog = $('confirm-dialog');
  dialog.returnValue = '';
  return new Promise(resolve => {
    dialog.addEventListener('close', () => resolve(dialog.returnValue === 'confirm'), { once: true });
    dialog.showModal();
  });
}

$('example').addEventListener('click', async () => {
  if (!await confirmReplace('example')) return;
  drafts[mode] = Object.fromEntries(MODES[mode].fields.map(([id, , , , example]) => [id, example]));
  expanded[mode] = true;
  render();
  notify('예시를 불러왔습니다. 내 상황에 맞게 수정해 보세요.');
});
$('reset').addEventListener('click', async () => {
  if (!await confirmReplace('reset')) return;
  drafts[mode] = {};
  expanded[mode] = false;
  render();
  notify('현재 메뉴의 입력 내용을 초기화했습니다.');
});

function legacyCopy(text) {
  const previousFocus = document.activeElement;
  const temporary = document.createElement('textarea');
  temporary.value = text;
  temporary.setAttribute('aria-label', '복사할 프롬프트');
  temporary.style.cssText = 'position:fixed;left:-9999px;top:0';
  document.body.append(temporary);
  let success = false;
  try {
    temporary.select();
    success = document.execCommand('copy');
  } catch { success = false; }
  finally { temporary.remove(); previousFocus?.focus(); }
  return success;
}

$('copy').addEventListener('click', async () => {
  const text = buildPrompt();
  if (!text) return;
  let success = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      success = true;
    }
  } catch { /* Some browsers restrict clipboard access on local files. */ }
  if (!success) success = legacyCopy(text);
  if (success) notify('전체 프롬프트를 복사했습니다.');
  else {
    $('select-output').hidden = false;
    $('copy-help').textContent = '자동 복사가 제한되어 있습니다. 아래 버튼으로 텍스트를 선택한 뒤 Ctrl+C 또는 ⌘C를 눌러 복사하세요. 모바일에서는 선택 영역을 길게 눌러 복사하세요.';
    notify('자동 복사를 사용할 수 없습니다. 직접 복사해 주세요.');
  }
});
$('select-output').addEventListener('click', () => {
  $('output').focus();
  const range = document.createRange();
  range.selectNodeContents($('output'));
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
});

render();

// Optional browser agent access; ordinary browsers simply skip registration.
if (document.modelContext?.registerTool) {
  try {
    Promise.resolve(document.modelContext.registerTool({
      name: 'read_current_prompt',
      description: 'Read the generated prompt in the currently selected menu.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute(input) {
        if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length) throw new Error('Expected an empty object.');
        return { mode, text: buildPrompt() };
      }
    })).catch(() => {});
  } catch { /* Experimental API support is optional. */ }
}
