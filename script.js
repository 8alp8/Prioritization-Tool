const tasks = [];

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const lightIcon = themeToggle.querySelector('.light-icon');
const darkIcon = themeToggle.querySelector('.dark-icon');

// ICO formatı kullan
lightIcon.src = 'images/icons/moon-light-mode.ico';
darkIcon.src = 'images/icons/moon-dark - mode.ico';

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  
  // Update theme icon
  const lightIcon = document.querySelector('.light-icon');
  const darkIcon = document.querySelector('.dark-icon');
  lightIcon.style.display = isDark ? 'none' : 'block';
  darkIcon.style.display = isDark ? 'block' : 'none';
  
  // Update all icons
  updateAllIcons();
  
  // Immediately update the graph
  updateMatrix();
  
  // Save preferences
  saveUserPreferences();
}

themeToggle.addEventListener('click', toggleTheme);

// Language support
const langSelect = document.getElementById('langSelect');
const translations = {
  tr: {
    pageTitle: "Görev Önceliklendirme Aracı",
    mainTitle: "Eisenhower Görev Önceliklendirme Aracı",
    mainSlogan: "Önceliklerinizi kolayca yönetin, verimliliğinizi artırın.",
    mainDesc: 'Görevlerinizi aciliyet ve önem derecelerine göre önceliklendirin.',
    taskListTitle: 'Görev Listesi',
    addTaskBtn: 'Ekle',
    priorityTitle: 'Öncelik Sıralaması',
    graphTitle: 'Görev Dağılım Grafiği',
    urgency: 'Aciliyet',
    importance: 'Önem',
    highPriority: 'Şimdi Yap',
    mediumPriority: 'Planla',
    lowPriority: 'Yok Et',
    immediately: 'Delege Et',
    soon: 'Yakında',
    planned: 'Planlanabilir',
    canWait: 'Bekleyebilir',
    critical: 'Kritik',
    important: 'Önemli',
    medium: 'Orta Düzey',
    unimportant: 'Önemsiz',
    editTask: 'Düzenle',
    newTaskPlaceholder: 'Yeni görev girin',
    deleteConfirm: 'Bu görevi silmek istediğinizden emin misiniz?',
    deleteConfirmTitle: 'Görevi Sil',
    deleteConfirmYes: 'Evet, Sil',
    deleteConfirmNo: 'Hayır, İptal',
    sliderLabels: {
      urgency: {
        8: 'Çok Acil',
        5: 'Acil',
        3: 'Orta',
        1: 'Düşük'
      },
      importance: {
        8: 'Çok Önemli',
        5: 'Önemli',
        3: 'Orta Düzey',
        1: 'Önemsiz'
      }
    },
    clearAllBtn: 'Tüm Görevleri Temizle',
    clearAllConfirm: 'Tüm görevleri silmek istediğinizden emin misiniz?',
    clearAllYes: 'Evet, Tümünü Sil',
    clearAllNo: 'Hayır, İptal',
    regionBoxes: {
      plan: {
        title: "Planla",
        importance: "⭐ Önem: 8-10",
        items: [
          "Önemli ama acil değil",
          "Planlanmalı"
        ]
      },
      doNow: {
        title: "Hemen Yap",
        urgency: "🔥 Aciliyet: 8-10",
        items: [
          "Acil ve önemli görevler",
          "Hemen yapılmalı"
        ]
      },
      delete: {
        title: "Sil/Ertele",
        importance: "⭐ Önem: 1-4",
        items: [
          "Ne acil ne önemli",
          "İptal edilebilir"
        ]
      },
      delegate: {
        title: "Delege Et",
        urgency: "🔥 Aciliyet: 5-7",
        items: [
          "Acil ama önemsiz",
          "Başkasına devredilebilir"
        ]
      }
    },
    regionExplanations: {
      '1': 'Şimdi Yap',
      '2': 'Planla',
      '3': 'Delege Et',
      '4': 'Sil'
    },
    regionDescriptions: {
      '1': 'Bu görev çok önemli ve çok acil. Hemen yapmalısın!',
      '2': 'Bu görev önemli ama acil değil. Plan yap ve zaman ayır.',
      '3': 'Bu görev acil ama çok önemli değil. Başkasına devretmeyi düşün.',
      '4': 'Bu görev ne acil ne de önemli. Sil veya göz ardı et.'
    }
  },
  en: {
    pageTitle: "Task Prioritization Tool",
    mainTitle: "Eisenhower Task Prioritization Tool",
    mainSlogan: "Easily manage your priorities, increase your productivity.",
    mainDesc: 'Prioritize your tasks by urgency and importance.',
    taskListTitle: 'Task List',
    addTaskBtn: 'Add',
    priorityTitle: 'Priority Ranking',
    graphTitle: 'Task Distribution Matrix',
    urgency: 'Urgency',
    importance: 'Importance',
    highPriority: 'Do Now',
    mediumPriority: 'Plan',
    lowPriority: 'Eliminate',
    immediately: 'Delegate',
    soon: 'Soon',
    planned: 'Can be planned',
    canWait: 'Can wait',
    critical: 'Critical',
    important: 'Important',
    medium: 'Medium',
    unimportant: 'Unimportant',
    editTask: 'Edit',
    newTaskPlaceholder: 'Enter new task',
    deleteConfirm: 'Are you sure you want to delete this task?',
    deleteConfirmTitle: 'Delete Task',
    deleteConfirmYes: 'Yes, Delete',
    deleteConfirmNo: 'No, Cancel',
    sliderLabels: {
      urgency: {
        8: 'Very Urgent',
        5: 'Urgent',
        3: 'Medium',
        1: 'Low'
      },
      importance: {
        8: 'Very Important',
        5: 'Important',
        3: 'Medium',
        1: 'Unimportant'
      }
    },
    clearAllBtn: 'Clear All Tasks',
    clearAllConfirm: 'Are you sure you want to delete all tasks?',
    clearAllYes: 'Yes, Delete All',
    clearAllNo: 'No, Cancel',
    regionBoxes: {
      plan: {
        title: "Plan",
        importance: "⭐ Importance: 8-10",
        items: [
          "Important but not urgent",
          "Should be planned"
        ]
      },
      doNow: {
        title: "Do Now",
        urgency: "🔥 Urgency: 8-10",
        items: [
          "Urgent and important tasks",
          "Must be done immediately"
        ]
      },
      delete: {
        title: "Delete/Postpone",
        importance: "⭐ Importance: 1-4",
        items: [
          "Neither urgent nor important",
          "Can be cancelled"
        ]
      },
      delegate: {
        title: "Delegate",
        urgency: "🔥 Urgency: 5-7",
        items: [
          "Urgent but not important",
          "Can be delegated"
        ]
      }
    },
    regionExplanations: {
      '1': 'Do Now',
      '2': 'Plan',
      '3': 'Delegate',
      '4': 'Delete'
    },
    regionDescriptions: {
      '1': 'This task is very important and urgent. Do it now!',
      '2': 'This task is important but not urgent. Plan and schedule it.',
      '3': 'This task is urgent but not very important. Consider delegating.',
      '4': 'This task is neither urgent nor important. Delete or ignore it.'
    }
  },
  de: {
    pageTitle: "Aufgaben-Priorisierungstool",
    mainTitle: "Eisenhower Aufgaben-Priorisierungstool",
    mainSlogan: "Verwalten Sie Ihre Prioritäten einfach und steigern Sie Ihre Produktivität.",
    mainDesc: 'Priorisieren Sie Ihre Aufgaben nach Dringlichkeit und Wichtigkeit.',
    taskListTitle: 'Aufgabenliste',
    addTaskBtn: '+',
    priorityTitle: 'Prioritätenreihenfolge',
    graphTitle: 'Aufgabenverteilung',
    urgency: 'Dringlichkeit',
    importance: 'Wichtigkeit',
    highPriority: 'Jetzt erledigen',
    mediumPriority: 'Planen',
    lowPriority: 'Eliminieren',
    immediately: 'Delegieren',
    soon: 'Bald',
    planned: 'Kann geplant werden',
    canWait: 'Kann warten',
    critical: 'Kritisch',
    important: 'Wichtig',
    medium: 'Mittel',
    unimportant: 'Unwichtig',
    editTask: 'Bearbeiten',
    newTaskPlaceholder: 'Neue Aufgabe eingeben',
    deleteConfirm: 'Sind Sie sicher, dass Sie diese Aufgabe löschen möchten?',
    deleteConfirmTitle: 'Aufgabe löschen',
    deleteConfirmYes: 'Ja, löschen',
    deleteConfirmNo: 'Nein, abbrechen',
    sliderLabels: {
      urgency: {
        8: 'Sehr dringend',
        5: 'Dringend',
        3: 'Mittel',
        1: 'Niedrig'
      },
      importance: {
        8: 'Sehr wichtig',
        5: 'Wichtig',
        3: 'Mittel',
        1: 'Unwichtig'
      }
    },
    clearAllBtn: 'Alle Aufgaben löschen',
    clearAllConfirm: 'Sind Sie sicher, dass Sie alle Aufgaben löschen möchten?',
    clearAllYes: 'Ja, löschen',
    clearAllNo: 'Nein, abbrechen',
    regionBoxes: {
      plan: {
        title: "Planen",
        importance: "⭐ Wichtigkeit: 8-10",
        items: [
          "Wichtig aber nicht dringend",
          "Sollte geplant werden"
        ]
      },
      doNow: {
        title: "Sofort Erledigen",
        urgency: "🔥 Dringlichkeit: 8-10",
        items: [
          "Dringende und wichtige Aufgaben",
          "Muss sofort erledigt werden"
        ]
      },
      delete: {
        title: "Löschen/Verschieben",
        importance: "⭐ Wichtigkeit: 1-4",
        items: [
          "Weder dringend no wichtig",
          "Kann gestrichen werden"
        ]
      },
      delegate: {
        title: "Delegieren",
        urgency: "🔥 Dringlichkeit: 5-7",
        items: [
          "Dringend aber nicht wichtig",
          "Kann delegiert werden"
        ]
      }
    },
    regionExplanations: {
      '1': 'Jetzt Machen',
      '2': 'Planen',
      '3': 'Delegieren',
      '4': 'Löschen'
    },
    regionDescriptions: {
      '1': 'Diese Aufgabe ist sehr wichtig und dringend. Jetzt erledigen!',
      '2': 'Diese Aufgabe ist wichtig, aber nicht dringend. Plane sie ein.',
      '3': 'Diese Aufgabe ist dringend, aber nicht sehr wichtig. Delegiere sie.',
      '4': 'Diese Aufgabe ist weder dringend no wichtig. Lösche oder ignoriere sie.'
    }
  },
  es: {
    pageTitle: "Herramienta de Priorización de Tareas",
    mainTitle: "Herramienta de Priorización de Tareas Eisenhower",
    mainSlogan: "Gestiona fácilmente tus prioridades, aumenta tu productividad.",
    mainDesc: 'Prioriza tus tareas por urgencia e importancia.',
    taskListTitle: 'Lista de Tareas',
    addTaskBtn: 'Añadir',
    priorityTitle: 'Clasificación de Prioridades',
    graphTitle: 'Matriz de Distribución de Tareas',
    urgency: 'Urgencia',
    importance: 'Importancia',
    highPriority: 'Hacer Ahora',
    mediumPriority: 'Planificar',
    lowPriority: 'Eliminar',
    immediately: 'Delegar',
    soon: 'Pronto',
    planned: 'Puede planificarse',
    canWait: 'Puede esperar',
    critical: 'Crítico',
    important: 'Importante',
    medium: 'Medio',
    unimportant: 'Sin importancia',
    editTask: 'Editar',
    newTaskPlaceholder: 'Ingrese nueva tarea',
    deleteConfirm: '¿Está seguro de que desea eliminar esta tarea?',
    deleteConfirmTitle: 'Eliminar Tarea',
    deleteConfirmYes: 'Sí, Eliminar',
    deleteConfirmNo: 'No, Cancelar',
    sliderLabels: {
      urgency: {
        8: 'Muy urgente',
        5: 'Urgente',
        3: 'Media',
        1: 'Baja'
      },
      importance: {
        8: 'Muy importante',
        5: 'Importante',
        3: 'Media',
        1: 'Sin importancia'
      }
    },
    clearAllBtn: 'Borrar Todas las Tareas',
    clearAllConfirm: '¿Está seguro de que desea eliminar todas las tareas?',
    clearAllYes: 'Sí, Eliminar Todo',
    clearAllNo: 'No, Cancelar',
    regionBoxes: {
      plan: {
        title: "Planificar",
        importance: "⭐ Importancia: 8-10",
        items: [
          "Importante pero no urgente",
          "Debe planificarse"
        ]
      },
      doNow: {
        title: "Hacer Ahora",
        urgency: "🔥 Urgencia: 8-10",
        items: [
          "Tareas urgentes e importantes",
          "Debe hacerse inmediatamente"
        ]
      },
      delete: {
        title: "Eliminar/Posponer",
        importance: "⭐ Importancia: 1-4",
        items: [
          "Ni urgente ni importante",
          "Puede cancelarse"
        ]
      },
      delegate: {
        title: "Delegar",
        urgency: "🔥 Urgencia: 5-7",
        items: [
          "Urgente pero no importante",
          "Puede delegarse"
        ]
      }
    },
    regionExplanations: {
      '1': 'Hacer Ahora',
      '2': 'Planificar',
      '3': 'Delegar',
      '4': 'Eliminar'
    },
    regionDescriptions: {
      '1': 'Esta tarea es muy importante y urgente. ¡Hazla ahora!',
      '2': 'Esta tarea es importante pero no urgente. Planifícala.',
      '3': 'Esta tarea es urgente pero no muy importante. Considera delegarla.',
      '4': 'Esta tarea no es urgente ni importante. Elimínala o ignórala.'
    }
  },
  fr: {
    pageTitle: "Outil de Priorisation des Tâches",
    mainTitle: "Outil de Priorisation des Tâches Eisenhower",
    mainSlogan: "Gérez facilement vos priorités, augmentez votre productivité.",
    mainDesc: 'Priorisez vos tâches selon l\'urgence et l\'importance.',
    taskListTitle: 'Liste des tâches',
    addTaskBtn: 'Ajouter',
    priorityTitle: 'Classement des priorités',
    graphTitle: 'Matrice de répartition des tâches',
    urgency: 'Urgence',
    importance: 'Importance',
    highPriority: 'Faire maintenant',
    mediumPriority: 'Planifier',
    lowPriority: 'Éliminer',
    immediately: 'Déléguer',
    soon: 'Bientôt',
    planned: 'Peut être planifié',
    canWait: 'Peut attendre',
    critical: 'Critique',
    important: 'Important',
    medium: 'Moyen',
    unimportant: 'Sans importance',
    editTask: 'Modifier',
    newTaskPlaceholder: 'Entrez une nouvelle tâche',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
    deleteConfirmTitle: 'Supprimer la tâche',
    deleteConfirmYes: 'Oui, supprimer',
    deleteConfirmNo: 'Non, annuler',
    sliderLabels: {
      urgency: {
        8: 'Très urgent',
        5: 'Urgent',
        3: 'Moyenne',
        1: 'Faible'
      },
      importance: {
        8: 'Très important',
        5: 'Important',
        3: 'Moyenne',
        1: 'Peu important'
      }
    },
    clearAllBtn: 'Effacer toutes les tâches',
    clearAllConfirm: 'Êtes-vous sûr de vouloir supprimer toutes les tâches ?',
    clearAllYes: 'Oui, supprimer',
    clearAllNo: 'Non, annuler',
    regionBoxes: {
      plan: {
        title: "Planifier",
        importance: "⭐ Importance: 8-10",
        items: [
          "Important mais pas urgent",
          "Doit être planifié"
        ]
      },
      doNow: {
        title: "Faire Maintenant",
        urgency: "🔥 Urgence: 8-10",
        items: [
          "Tâches urgentes et importantes",
          "Doit être fait immédiatement"
        ]
      },
      delete: {
        title: "Supprimer/Reporter",
        importance: "⭐ Importance: 1-4",
        items: [
          "Ni urgent ni important",
          "Peut être annulé"
        ]
      },
      delegate: {
        title: "Déléguer",
        urgency: "🔥 Urgence: 5-7",
        items: [
          "Urgent mais pas important",
          "Peut être délégué"
        ]
      }
    },
    regionExplanations: {
      '1': 'Faire Maintenant',
      '2': 'Planifier',
      '3': 'Déléguer',
      '4': 'Supprimer'
    },
    regionDescriptions: {
      '1': 'Cette tâche est très importante et urgente. Faites-la maintenant!',
      '2': 'Cette tâche est importante mais pas urgente. Planifiez-la.',
      '3': 'Cette tâche est urgente mais pas très importante. Déléguez-la.',
      '4': "Cette tâche n'est ni urgente ni importante. Supprimez-la ou ignorez-la."
    }
  },
  zh: {
    pageTitle: "任务优先级工具",
    mainTitle: "艾森豪威尔任务优先级工具",
    mainSlogan: "轻松管理您的优先级，提高您的生产力。",
    mainDesc: '根据紧急性和重要性对任务进行优先级排序。',
    taskListTitle: '任务列表',
    addTaskBtn: '添加',
    priorityTitle: '优先级排序',
    graphTitle: '任务分布矩阵',
    urgency: '紧急性',
    importance: '重要性',
    highPriority: '立即执行',
    mediumPriority: '规划',
    lowPriority: '消除',
    immediately: '委托',
    soon: '尽快',
    planned: '可以计划',
    canWait: '可以等待',
    critical: '关键',
    important: '重要',
    medium: '中等',
    unimportant: '不重要',
    editTask: '编辑',
    newTaskPlaceholder: '输入新任务',
    deleteConfirm: '确定要删除此任务吗？',
    deleteConfirmTitle: '删除任务',
    deleteConfirmYes: '是的，删除',
    deleteConfirmNo: '不，取消',
    sliderLabels: {
      urgency: {
        8: '非常紧急',
        5: '紧急',
        3: '中等',
        1: '低'
      },
      importance: {
        8: '非常重要',
        5: '重要',
        3: '中等',
        1: '不重要'
      }
    },
    clearAllBtn: '清除所有任务',
    clearAllConfirm: '确定要删除所有任务吗？',
    clearAllYes: '是的，删除所有',
    clearAllNo: '不，取消',
    regionBoxes: {
      plan: {
        title: "计划",
        importance: "⭐ 重要度: 8-10",
        items: [
          "重要但不紧急",
          "需要计划"
        ]
      },
      doNow: {
        title: "立即执行",
        urgency: "🔥 紧急度: 8-10",
        items: [
          "紧急且重要的任务",
          "必须立即完成"
        ]
      },
      delete: {
        title: "删除/推迟",
        importance: "⭐ 重要度: 1-4",
        items: [
          "既不紧急也不重要",
          "可以取消"
        ]
      },
      delegate: {
        title: "委派",
        urgency: "🔥 紧急度: 5-7",
        items: [
          "紧急但不重要",
          "可以委派他人"
        ]
      }
    },
    regionExplanations: {
      '1': '立即执行',
      '2': '计划',
      '3': '委派',
      '4': '删除'
    },
    regionDescriptions: {
      '1': '此任务非常重要且紧急。现在就做！',
      '2': '此任务重要但不紧急。请计划安排。',
      '3': '此任务紧急但不太重要。考虑委派。',
      '4': '此任务既不紧急也不重要。请删除或忽略。'
    }
  },
  ja: {
    pageTitle: "タスク優先順位付けツール",
    mainTitle: "アイゼンハワータスク優先順位付けツール",
    mainSlogan: "優先順位を簡単に管理し、生産性を向上させましょう。",
    mainDesc: '緊急度と重要度でタスクに優先順位を付けましょう。',
    taskListTitle: 'タスクリスト',
    addTaskBtn: '追加',
    priorityTitle: '優先順位リスト',
    graphTitle: 'タスク分布マトリックス',
    urgency: '緊急度',
    importance: '重要度',
    highPriority: '今すぐ実行',
    mediumPriority: '計画する',
    lowPriority: '排除する',
    immediately: '委任する',
    soon: '近日中',
    planned: '計画可能',
    canWait: '待機可能',
    critical: '重要',
    important: '重要',
    medium: '中程度',
    unimportant: '重要でない',
    editTask: '編集',
    newTaskPlaceholder: '新しいタスクを入力',
    deleteConfirm: 'このタスクを削除してもよろしいですか？',
    deleteConfirmTitle: 'タスクの削除',
    deleteConfirmYes: 'はい、削除する',
    deleteConfirmNo: 'いいえ、キャンセル',
    sliderLabels: {
      urgency: {
        8: '非常に緊急',
        5: '緊急',
        3: '中程度',
        1: '低い'
      },
      importance: {
        8: '非常に重要',
        5: '重要',
        3: '中程度',
        1: '重要でない'
      }
    },
    clearAllBtn: 'すべてのタスクを削除',
    clearAllConfirm: 'すべてのタスクを削除してもよろしいですか？',
    clearAllYes: 'はい、すべて削除',
    clearAllNo: 'いいえ、キャンセル',
    regionBoxes: {
      plan: {
        title: "計画",
        importance: "⭐ 重要度: 8-10",
        items: [
          "重要だが緊急ではない",
          "計画を立てる必要あり"
        ]
      },
      doNow: {
        title: "今すぐ実行",
        urgency: "🔥 緊急度: 8-10",
        items: [
          "緊急かつ重要なタスク",
          "すぐに実行する必要あり"
        ]
      },
      delete: {
        title: "削除/延期",
        importance: "⭐ 重要度: 1-4",
        items: [
          "緊急でも重要でもない",
          "キャンセル可能"
        ]
      },
      delegate: {
        title: "委任",
        urgency: "🔥 緊急度: 5-7",
        items: [
          "緊急だが重要ではない",
          "委任可能"
        ]
      }
    },
    regionExplanations: {
      '1': '今すぐ実行',
      '2': '計画',
      '3': '委任',
      '4': '削除'
    },
    regionDescriptions: {
      '1': 'このタスクは非常に重要かつ緊急です。今すぐ実行しましょう！',
      '2': 'このタスクは重要ですが緊急ではありません。計画を立てましょう。',
      '3': 'このタスクは緊急ですがあまり重要ではありません。委任を検討しましょう。',
      '4': 'このタスクは緊急でも重要でもありません。削除または無視しましょう。'
    }
  },
  ch: {
    pageTitle: "Aufgaben-Priorisierungstool",
    mainTitle: "Eisenhower Aufgaben-Priorisierungstool",
    mainSlogan: "Verwalte dini Prioritäte eifach und steigere dini Produktivität.",
    mainDesc: 'Priorisiere dini Ufgabe nach Dringlichkeit und Wichtigkeite.',
    taskListTitle: 'Ufgabenliste',
    addTaskBtn: '+',
    priorityTitle: 'Prioritäte',
    graphTitle: 'Ufgabenverteilig',
    urgency: 'Dringlichkeit',
    importance: 'Wichtigkeite',
    highPriority: 'Jetzt mache',
    mediumPriority: 'Plane',
    lowPriority: 'Eliminiere',
    immediately: 'Delegiere',
    soon: 'Bald',
    planned: 'Chann gplant werde',
    canWait: 'Chann warte',
    critical: 'Kritisch',
    important: 'Wichtig',
    medium: 'Mittel',
    unimportant: 'Unwichtig',
    editTask: 'Bearbeite',
    newTaskPlaceholder: 'Neui Ufgabe iigäh',
    deleteConfirm: 'Bisch sicher, dass du die Ufgabe wotsch lösche?',
    deleteConfirmTitle: 'Ufgabe lösche',
    deleteConfirmYes: 'Ja, lösche',
    deleteConfirmNo: 'Nei, abbräche',
    sliderLabels: {
      urgency: {
        8: 'Sofort',
        5: 'Bald',
        3: 'Chann gplant werde',
        1: 'Chann warte'
      },
      importance: {
        8: 'Kritisch',
        5: 'Wichtig',
        3: 'Mittel',
        1: 'Unwichtig'
      }
    },
    clearAllBtn: 'Alli Ufgabe lösche',
    clearAllConfirm: 'Bisch sicher, dass du alli Ufgabe wotsch lösche?',
    clearAllYes: 'Ja, alli lösche',
    clearAllNo: 'Nei, abbräche',
    regionBoxes: {
      plan: {
        title: "Plane",
        importance: "⭐ Wichtigkeite: 8-10",
        items: [
          "Wichtig aber nöd dringend",
          "Sott gplant werde"
        ]
      },
      doNow: {
        title: "Jetzt Mache",
        urgency: "🔥 Dringlichkeit: 8-10",
        items: [
          "Dringendi und wichtigi Ufgabe",
          "Muss sofort gmacht werde"
        ]
      },
      delete: {
        title: "Lösche/Verschiebe",
        importance: "⭐ Wichtigkeite: 1-4",
        items: [
          "Weder dringend no wichtig",
          "Chann gstriche werde"
        ]
      },
      delegate: {
        title: "Delegiere",
        urgency: "🔥 Dringlichkeit: 5-7",
        items: [
          "Dringend aber nöd wichtig",
          "Chann delegiert werde"
        ]
      }
    },
    regionExplanations: {
      '1': 'Jetzt Mache',
      '2': 'Plane',
      '3': 'Delegiere',
      '4': 'Lösche'
    },
    regionDescriptions: {
      '1': 'Die Ufgabe isch sehr wichtig und dringend. Mach sie jetzt!',
      '2': 'Die Ufgabe isch wichtig, aber nöd dringend. Plane sie.',
      '3': 'Die Ufgabe isch dringend, aber nöd sehr wichtig. Delegiere sie.',
      '4': 'Die Ufgabe isch weder dringend no wichtig. Lösche oder ignoriere sie.'
    }
  },
  gsw: {
    pageTitle: "Aufgaben-Priorisierungstool",
    mainTitle: "Eisenhower Aufgaben-Priorisierungstool",
    mainSlogan: "Verwalte dini Prioritäte eifach und steigere dini Produktivität.",
    mainDesc: 'Priorisiere dini Ufgabe nach Dringlichkeit und Wichtigkeite.',
    taskListTitle: 'Ufgabenliste',
    addTaskBtn: '+',
    priorityTitle: 'Prioritäte',
    graphTitle: 'Ufgabenverteilig',
    urgency: 'Dringlichkeit',
    importance: 'Wichtigkeite',
    highPriority: 'Jetzt mache',
    mediumPriority: 'Plane',
    lowPriority: 'Eliminiere',
    immediately: 'Delegiere',
    soon: 'Bald',
    planned: 'Chann gplant werde',
    canWait: 'Chann warte',
    critical: 'Kritisch',
    important: 'Wichtig',
    medium: 'Mittel',
    unimportant: 'Unwichtig',
    editTask: 'Bearbeite',
    newTaskPlaceholder: 'Neui Ufgabe iigäh',
    deleteConfirm: 'Bisch sicher, dass du die Ufgabe wotsch lösche?',
    deleteConfirmTitle: 'Ufgabe lösche',
    deleteConfirmYes: 'Ja, lösche',
    deleteConfirmNo: 'Nei, abbräche',
    sliderLabels: {
      urgency: {
        8: 'Sofort',
        5: 'Bald',
        3: 'Chann gplant werde',
        1: 'Chann warte'
      },
      importance: {
        8: 'Kritisch',
        5: 'Wichtig',
        3: 'Mittel',
        1: 'Unwichtig'
      }
    },
    clearAllBtn: 'Alli Ufgabe lösche',
    clearAllConfirm: 'Bisch sicher, dass du alli Ufgabe wotsch lösche?',
    clearAllYes: 'Ja, alli lösche',
    clearAllNo: 'Nei, abbräche',
    regionBoxes: {
      plan: {
        title: "Plane",
        importance: "⭐ Wichtigkeite: 8-10",
        items: [
          "Wichtig aber nöd dringend",
          "Sott gplant werde"
        ]
      },
      doNow: {
        title: "Jetzt Mache",
        urgency: "🔥 Dringlichkeit: 8-10",
        items: [
          "Dringendi und wichtigi Ufgabe",
          "Muss sofort gmacht werde"
        ]
      },
      delete: {
        title: "Lösche/Verschiebe",
        importance: "⭐ Wichtigkeite: 1-4",
        items: [
          "Weder dringend no wichtig",
          "Chann gstriche werde"
        ]
      },
      delegate: {
        title: "Delegiere",
        urgency: "🔥 Dringlichkeit: 5-7",
        items: [
          "Dringend aber nöd wichtig",
          "Chann delegiert werde"
        ]
      }
    },
    regionExplanations: {
      '1': 'Jetzt Mache',
      '2': 'Plane',
      '3': 'Delegiere',
      '4': 'Lösche'
    },
    regionDescriptions: {
      '1': 'Die Ufgabe isch sehr wichtig und dringend. Mach sie jetzt!',
      '2': 'Die Ufgabe isch wichtig, aber nöd dringend. Plane sie.',
      '3': 'Die Ufgabe isch dringend, aber nöd sehr wichtig. Delegiere sie.',
      '4': 'Die Ufgabe isch weder dringend no wichtig. Lösche oder ignoriere sie.'
    }
  }
};
langSelect.onchange = function() {
  const lang = langSelect.value;
  const t = translations[lang];
  
  // Update all text elements
  document.getElementById('mainTitle').textContent = t.mainTitle;
  document.getElementById('mainSlogan').textContent = t.mainSlogan;
  document.getElementById('taskListTitle').textContent = t.taskListTitle;
  document.getElementById('addTaskBtn').textContent = t.addTaskBtn;
  document.getElementById('priorityTitle').textContent = t.priorityTitle;
  document.getElementById('graphTitle').textContent = t.graphTitle;
  document.getElementById('taskInput').placeholder = t.newTaskPlaceholder;
  
  // Update existing tasks
  document.querySelectorAll('.task').forEach((taskDiv, index) => {
    const task = tasks[index];
    const strong = taskDiv.querySelector('strong');
    const isDark = document.body.classList.contains('dark');
    const editIcon = isDark ? 'images/icons/pen-dark mode.ico' : 'images/icons/pen-light-mode.ico';
    
    strong.innerHTML = `${task.title} <button class="edit-btn" title="${t.editTask}"><img src="${editIcon}" alt="edit"></button></strong>`;
    
    // Update slider labels
    const urgencyLabel = taskDiv.querySelector('.slider-label:first-child');
    const importanceLabel = taskDiv.querySelector('.slider-label:last-child');
    if (urgencyLabel) urgencyLabel.textContent = `${t.urgency}:`;
    if (importanceLabel) importanceLabel.textContent = `${t.importance}:`;
    
    // Update slider value labels
    const urgencySlider = taskDiv.querySelector('input[type="range"]:first-child');
    const importanceSlider = taskDiv.querySelector('input[type="range"]:last-child');
    if (urgencySlider) {
      const urgencyValueLabel = urgencySlider.parentElement.querySelector('.slider-value-label');
      if (urgencyValueLabel) {
        let val = parseInt(urgencySlider.value);
        let desc = '';
        if (val >= 8) desc = t.sliderLabels.urgency[8];
        else if (val >= 5) desc = t.sliderLabels.urgency[5];
        else if (val >= 3) desc = t.sliderLabels.urgency[3];
        else desc = t.sliderLabels.urgency[1];
        urgencyValueLabel.innerHTML = `<span style="font-weight:${val >= 8 ? 800 : val >= 5 ? 600 : val >= 3 ? 500 : 400}">${val}</span><span style="font-weight:${val >= 8 ? 800 : val >= 5 ? 600 : val >= 3 ? 500 : 400};font-size:0.98em;margin-left:0.5em">${desc}</span>`;
      }
    }
    if (importanceSlider) {
      const importanceValueLabel = importanceSlider.parentElement.querySelector('.slider-value-label');
      if (importanceValueLabel) {
        let val = parseInt(importanceSlider.value);
        let desc = '';
        if (val >= 8) desc = t.sliderLabels.importance[8];
        else if (val >= 5) desc = t.sliderLabels.importance[5];
        else if (val >= 3) desc = t.sliderLabels.importance[3];
        else desc = t.sliderLabels.importance[1];
        importanceValueLabel.innerHTML = `<span style="font-weight:${val >= 8 ? 800 : val >= 5 ? 600 : val >= 3 ? 500 : 400}">${val}</span><span style="font-weight:${val >= 8 ? 800 : val >= 5 ? 600 : val >= 3 ? 500 : 400};font-size:0.98em;margin-left:0.5em">${desc}</span>`;
      }
    }
  });
  
  // Update priority list
  updatePriorityList();
  
  // Update matrix
  updateMatrix();
  
  // Update clear all button text
  const clearAllBtn = document.querySelector('.btn-main[style*="marginTop"]');
  if (clearAllBtn) {
    clearAllBtn.textContent = t.clearAllBtn;
  }
  
  // Save preferences
  saveUserPreferences();
};

function createSlider(task, type, idx) {
  const wrapper = document.createElement('div');
  wrapper.className = 'slider-wrapper';
  const range = document.createElement('input');
  range.type = 'range';
  range.min = 0;
  range.max = 10;
  range.step = 1;
  range.value = task[type];
  
  // Label row
  const labelRow = document.createElement('div');
  labelRow.className = 'slider-label-row';
  const label = document.createElement('div');
  label.className = 'slider-label';
  const t = translations[langSelect.value];
  label.textContent = `${type === 'urgency' ? t.urgency : t.importance}:`;
  
  // Value + description
  const valueLabel = document.createElement('span');
  valueLabel.className = 'slider-value-label';
  
  function updateSliderLabel() {
    let val = parseInt(range.value);
    let desc = '';
    let weight = 400;
    
    if (type === 'urgency') {
      if (val >= 8) { desc = t.sliderLabels.urgency[8]; weight = 800; }
      else if (val >= 5) { desc = t.sliderLabels.urgency[5]; weight = 600; }
      else if (val >= 3) { desc = t.sliderLabels.urgency[3]; weight = 500; }
      else { desc = t.sliderLabels.urgency[1]; weight = 400; }
    } else {
      if (val >= 8) { desc = t.sliderLabels.importance[8]; weight = 800; }
      else if (val >= 5) { desc = t.sliderLabels.importance[5]; weight = 600; }
      else if (val >= 3) { desc = t.sliderLabels.importance[3]; weight = 500; }
      else { desc = t.sliderLabels.importance[1]; weight = 400; }
    }
    
    // Create separate spans for number and description
    const numberSpan = document.createElement('span');
    numberSpan.style.fontWeight = weight;
    numberSpan.textContent = val;
    
    const descSpan = document.createElement('span');
    descSpan.style.fontWeight = weight;
    descSpan.style.fontSize = '0.98em';
    descSpan.style.marginLeft = '0.5em';
    descSpan.textContent = desc;
    
    // Clear and append new elements
    valueLabel.innerHTML = '';
    valueLabel.appendChild(numberSpan);
    valueLabel.appendChild(descSpan);
  }
  
  updateSliderLabel();
  labelRow.appendChild(label);
  labelRow.appendChild(valueLabel);
  wrapper.appendChild(labelRow);
  wrapper.appendChild(range);
  
  // Update label when slider changes
  range.addEventListener('input', () => {
    task[type] = parseInt(range.value);
    updateThumb();
    updateMatrix();
    updatePriorityList();
    updateSliderLabel();
  });
  
  // Thumb renk ve boyut
  function updateThumb() {
    let val = parseInt(range.value);
    let total = type === 'urgency' ? val + task.importance : val + task.urgency;
    let color = '';
    if (total <= 10) {
      const t = (total) / 10;
      const r = Math.round(162 + (255-162)*t);
      const g = Math.round(89 + (184-89)*t);
      const b = Math.round(198 + (107-198)*t);
      color = `rgb(${r},${g},${b})`;
    } else {
      const t = (total - 10) / 10;
      const r = Math.round(255 + (67-255)*t);
      const g = Math.round(184 + (191-184)*t);
      const b = Math.round(107 + (160-107)*t);
      color = `rgb(${r},${g},${b})`;
    }
    let size = 18 + (val/10)*18; // min 18, max 36
    range.style.setProperty('--thumb-color', color);
    range.style.setProperty('--thumb-size', size+'px');
  }
  range.addEventListener('input', () => {
    task[type] = parseInt(range.value);
    updateThumb();
    updateMatrix();
    updatePriorityList();
    updateSliderLabel();
  });
  // Thumb CSS
  range.style.setProperty('--thumb-color', '#a259c6');
  range.style.setProperty('--thumb-size', '18px');
  range.oninput = updateThumb;
  // Thumb dynamic style
  range.style.setProperty('accent-color', 'var(--primary)');
  range.style.setProperty('background', '#222');
  range.style.setProperty('border-radius', '4px');
  range.style.setProperty('height', '7px');
  range.style.setProperty('outline', 'none');
  range.style.setProperty('margin-bottom', '0.2rem');
  range.style.setProperty('transition', 'background 0.18s');
  range.style.setProperty('box-shadow', '0 2px 6px rgba(44,62,80,0.13)');
  // Custom thumb
  range.addEventListener('input', function() {
    let val = parseInt(range.value);
    let total = type === 'urgency' ? val + task.importance : val + task.urgency;
    let color = '';
    if (total <= 10) {
      const t = (total) / 10;
      const r = Math.round(162 + (255-162)*t);
      const g = Math.round(89 + (184-89)*t);
      const b = Math.round(198 + (107-198)*t);
      color = `rgb(${r},${g},${b})`;
    } else {
      const t = (total - 10) / 10;
      const r = Math.round(255 + (67-255)*t);
      const g = Math.round(184 + (191-184)*t);
      const b = Math.round(107 + (160-107)*t);
      color = `rgb(${r},${g},${b})`;
    }
    let size = 18 + (val/10)*18;
    range.style.setProperty('--thumb-color', color);
    range.style.setProperty('--thumb-size', size+'px');
  });
  // Style for dynamic thumb
  range.style.setProperty('background', '#222');
  range.style.setProperty('height', '7px');
  range.style.setProperty('border-radius', '4px');
  range.style.setProperty('outline', 'none');
  range.style.setProperty('margin-bottom', '0.2rem');
  range.style.setProperty('transition', 'background 0.18s');
  range.style.setProperty('box-shadow', '0 2px 6px rgba(44,62,80,0.13)');
  range.style.setProperty('accent-color', 'var(--primary)');
  // Custom thumb CSS
  range.style.setProperty('appearance', 'none');
  range.style.setProperty('WebkitAppearance', 'none');
  range.style.setProperty('MozAppearance', 'none');
  range.style.setProperty('background', '#222');
  range.style.setProperty('border', 'none');
  range.style.setProperty('outline', 'none');
  range.style.setProperty('box-shadow', '0 2px 6px rgba(44,62,80,0.13)');
  range.style.setProperty('height', '7px');
  // Custom thumb via CSS
  range.style.setProperty('--webkit-slider-thumb', `background: var(--thumb-color); width: var(--thumb-size); height: var(--thumb-size); border-radius: 50%; border: 2px solid #fff;`);
  return wrapper;
}

// Create a reusable edit function
function createEditHandler(task, div, t, editIcon) {
  return function() {
    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = task.title;
    inputEdit.className = 'edit-input';
    div.classList.add('editing');
    
    const currentStrong = div.querySelector('strong');
    currentStrong.replaceWith(inputEdit);
    inputEdit.focus();
    
    inputEdit.onblur = function() {
      const newTitle = toCapitalizedCase(inputEdit.value.trim());
      if (!newTitle) {
        // If title is empty, delete the task
        const index = tasks.indexOf(task);
        if (index > -1) {
          tasks.splice(index, 1);
          div.remove();
          updateMatrix();
          updatePriorityList();
          saveUserPreferences();
        }
        return;
      }
      
      task.title = newTitle;
      const newStrong = document.createElement('strong');
      newStrong.innerHTML = `${task.title} <button class="edit-btn" title="${t.editTask}"><img src="${editIcon}" alt="edit"></button></strong>`;
      inputEdit.replaceWith(newStrong);
      div.classList.remove('editing');
      
      // Reattach click handler
      const newEditBtn = newStrong.querySelector('.edit-btn');
      newEditBtn.onclick = createEditHandler(task, div, t, editIcon);
      
      saveUserPreferences();
    };
    
    inputEdit.onkeydown = function(e) {
      if (e.key === 'Enter') {
        const newTitle = toCapitalizedCase(inputEdit.value.trim());
        if (!newTitle) {
          // If title is empty, delete the task
          const index = tasks.indexOf(task);
          if (index > -1) {
            tasks.splice(index, 1);
            div.remove();
            updateMatrix();
            updatePriorityList();
            saveUserPreferences();
          }
          return;
        }
        inputEdit.blur();
      }
    };
  };
}

function addTask() {
  const input = document.getElementById('taskInput');
  const title = toCapitalizedCase(input.value.trim());
  if (!title) return;
  const task = { title, urgency: 5, importance: 5 };
  tasks.push(task);
  addTaskCardToUI(task, tasks.length-1);
  input.value = '';
  updateMatrix();
  updatePriorityList();
  saveUserPreferences();
  updateClearAllButtonVisibility();
}

// Function to update clear all button visibility
function updateClearAllButtonVisibility() {
  const clearAllBtn = document.querySelector('.btn-main[style*="marginTop"]');
  if (clearAllBtn) {
    clearAllBtn.style.display = tasks.length >= 2 ? 'block' : 'none';
    clearAllBtn.textContent = translations[langSelect.value].clearAllBtn;
  }
}

function toCapitalizedCase(str) {
  return str.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function updateMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  const padding = 40;
  const graphWidth = canvas.width - (padding * 2);
  const graphHeight = canvas.height - (padding * 2);
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Background
  ctx.fillStyle = document.body.classList.contains('dark') ? '#23272f' : '#f7f8fa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw colored regions
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = '#7be15c'; // Sol üst
  ctx.fillRect(padding, padding, graphWidth/2, graphHeight/2);
  ctx.fillStyle = '#ffa64d'; // Sağ üst
  ctx.fillRect(padding + graphWidth/2, padding, graphWidth/2, graphHeight/2);
  ctx.fillStyle = '#2ed0f7'; // Sol alt
  ctx.fillRect(padding, padding + graphHeight/2, graphWidth/2, graphHeight/2);
  ctx.fillStyle = '#ff4d4d'; // Sağ alt
  ctx.fillRect(padding + graphWidth/2, padding + graphHeight/2, graphWidth/2, graphHeight/2);
  ctx.globalAlpha = 1;
  
  // Draw grid
  ctx.strokeStyle = document.body.classList.contains('dark') ? '#444' : '#e3e6ee';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const x = padding + (i * (graphWidth/10));
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, padding + graphHeight);
    ctx.stroke();
  }
  for (let i = 0; i <= 10; i++) {
    const y = padding + (i * (graphHeight/10));
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(padding + graphWidth, y);
    ctx.stroke();
  }
  
  // Region labels (white in dark mode)
  const t = translations[langSelect.value];
  ctx.save();
  ctx.font = 'bold 18px Montserrat';
  ctx.fillStyle = document.body.classList.contains('dark') ? '#fff' : '#234';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(t.regionExplanations['1'], padding + graphWidth * 0.25, padding + graphHeight * 0.25);
  ctx.fillText(t.regionExplanations['2'], padding + graphWidth * 0.75, padding + graphHeight * 0.25);
  ctx.fillText(t.regionExplanations['3'], padding + graphWidth * 0.25, padding + graphHeight * 0.75);
  ctx.fillText(t.regionExplanations['4'], padding + graphWidth * 0.75, padding + graphHeight * 0.75);
  ctx.restore();
  
  // Eksenler
  ctx.strokeStyle = document.body.classList.contains('dark') ? '#666' : '#bbb';
  ctx.beginPath();
  ctx.moveTo(padding + graphWidth/2, padding);
  ctx.lineTo(padding + graphWidth/2, padding + graphHeight);
  ctx.moveTo(padding, padding + graphHeight/2);
  ctx.lineTo(padding + graphWidth, padding + graphHeight/2);
  ctx.stroke();
  
  // Draw points (urgency reversed)
  tasks.forEach((task, idx) => {
    const x = padding + ((10 - task.urgency) * (graphWidth / 10));
    const y = padding + (graphHeight - (task.importance * (graphHeight/10)));
    ctx.save();
    if (window._highlightedTask === idx) {
      ctx.shadowColor = document.body.classList.contains('dark') ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 18;
    }
    let total = task.urgency + task.importance;
    let color = '';
    if (total <= 10) {
      const t = (total) / 10;
      const r = Math.round(162 + (255-162)*t);
      const g = Math.round(89 + (184-89)*t);
      const b = Math.round(198 + (107-198)*t);
      color = `rgb(${r},${g},${b})`;
    } else {
      const t = (total - 10) / 10;
      const r = Math.round(255 + (67-255)*t);
      const g = Math.round(184 + (191-184)*t);
      const b = Math.round(107 + (160-107)*t);
      color = `rgb(${r},${g},${b})`;
    }
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.font = window._highlightedTask === idx ? 'bold 16px Montserrat' : '14px Montserrat';
    ctx.fillStyle = document.body.classList.contains('dark') ? '#fff' : '#234';
    ctx.fillText(`(${idx+1})`, x+13, y-13);
    ctx.restore();
  });
}

function updatePriorityList() {
  const sorted = [...tasks].map((t, i) => ({...t, _idx: i})).sort((a, b) => (b.urgency + b.importance) - (a.urgency + a.importance));
  const container = document.getElementById('priority');
  container.innerHTML = '';
  const t = translations[langSelect.value];
  
  sorted.forEach((task, i) => {
    const div = document.createElement('div');
    div.className = 'task-card';
    const total = task.urgency + task.importance;
    let comment = '';
    let color = '';
    if (total <= 10) {
      const t = (total) / 10;
      const r = Math.round(162 + (255-162)*t);
      const g = Math.round(89 + (184-89)*t);
      const b = Math.round(198 + (107-198)*t);
      color = `rgb(${r},${g},${b})`;
    } else {
      const t = (total - 10) / 10;
      const r = Math.round(255 + (67-255)*t);
      const g = Math.round(184 + (191-184)*t);
      const b = Math.round(107 + (160-107)*t);
      color = `rgb(${r},${g},${b})`;
    }
    if (total >= 16) comment = t.highPriority;
    else if (total >= 12) comment = t.mediumPriority;
    else comment = t.lowPriority;
    div.innerHTML = `<span class="score-box" style="background:${color}">${task.urgency + task.importance}</span> <strong>${task.title}</strong> <span style="margin-left:0.7em;font-size:0.98em;color:#888;">(${task._idx+1})</span><small>${comment}</small>`;
    div.onmouseenter = () => { window._highlightedTask = task._idx; updateMatrix(); };
    div.onmouseleave = () => { window._highlightedTask = null; updateMatrix(); };
    container.appendChild(div);
  });
}

document.getElementById('regionExplanation').style.display = 'none';
document.getElementById('graphInfoBox').style.display = 'none';

// Enter ile görev ekleme
document.getElementById('taskInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addTask();
});

// Update all icons based on current theme
function updateAllIcons() {
  const isDark = document.body.classList.contains('dark');
  const editIcon = isDark ? 'images/icons/pen-dark mode.ico' : 'images/icons/pen-light-mode.ico';
  const trashIcon = isDark ? 'images/icons/trash-can-dark-mode.ico' : 'images/icons/trash-can-light-mode.ico';
  
  document.querySelectorAll('.edit-btn img').forEach(img => {
    img.src = editIcon;
  });
  document.querySelectorAll('.trash-btn img').forEach(img => {
    img.src = trashIcon;
  });
}

// Save user preferences including tasks
function saveUserPreferences() {
  const preferences = {
    language: langSelect.value,
    theme: document.body.classList.contains('dark') ? 'dark' : 'light',
    tasks: tasks
  };
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// Load user preferences and tasks from localStorage
function loadUserPreferences() {
  const savedPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
  // Load theme
  if (savedPreferences.theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  // Load language
  if (savedPreferences.language) {
    langSelect.value = savedPreferences.language;
  }
  // Load tasks
  if (savedPreferences.tasks && Array.isArray(savedPreferences.tasks)) {
    tasks.length = 0;
    document.getElementById('tasks').innerHTML = '';
    savedPreferences.tasks.forEach(task => {
      tasks.push(task);
      addTaskCardToUI(task, tasks.length-1);
    });
    updateMatrix();
    updatePriorityList();
    updateClearAllButtonVisibility();
  }
}

// Set default language to Turkish when page loads
document.addEventListener('DOMContentLoaded', function() {
  const langSelect = document.getElementById('langSelect');
  langSelect.value = 'tr';
  updateTranslations();
});

// Custom Alert Function
function showCustomAlert(message, onConfirm) {
  const alert = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  const confirmBtn = document.getElementById('confirmBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const closeBtn = document.getElementById('closeAlert');
  const t = translations[langSelect.value];

  alertMessage.textContent = message;
  confirmBtn.textContent = message.includes('tüm') ? t.clearAllYes : t.deleteConfirmYes;
  cancelBtn.textContent = message.includes('tüm') ? t.clearAllNo : t.deleteConfirmNo;
  alert.style.display = 'flex';

  const closeAlert = () => {
    alert.style.display = 'none';
  };

  confirmBtn.onclick = () => {
    closeAlert();
    onConfirm();
  };

  cancelBtn.onclick = closeAlert;
  closeBtn.onclick = closeAlert;
}

// Update event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme icons
  const lightIcon = document.querySelector('.light-icon');
  const darkIcon = document.querySelector('.dark-icon');
  
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', toggleTheme);
  
  // Create clear all button
  const taskListSection = document.querySelector('.task-list');
  const clearAllBtn = document.createElement('button');
  clearAllBtn.className = 'btn-main';
  clearAllBtn.style.marginTop = '1rem';
  clearAllBtn.style.display = 'none'; // Initially hidden
  clearAllBtn.onclick = function() {
    const t = translations[langSelect.value];
    showCustomAlert(t.clearAllConfirm, () => {
      tasks.length = 0;
      document.getElementById('tasks').innerHTML = '';
      updateMatrix();
      updatePriorityList();
      saveUserPreferences();
      updateClearAllButtonVisibility();
    });
  };
  taskListSection.appendChild(clearAllBtn);
  
  // Load saved preferences
  loadUserPreferences();
  
  // Language change
  langSelect.addEventListener('change', function() {
    updateTranslations();
    // Immediately update all task elements
    document.querySelectorAll('.task').forEach((taskDiv, index) => {
      const task = tasks[index];
      const strong = taskDiv.querySelector('strong');
      const t = translations[langSelect.value];
      const isDark = document.body.classList.contains('dark');
      const editIcon = isDark ? 'images/icons/pen-dark mode.ico' : 'images/icons/pen-light-mode.ico';
      
      strong.innerHTML = `${task.title} <button class="edit-btn" title="${t.editTask}"><img src="${editIcon}" alt="edit"></button></strong>`;
      
      // Update slider labels
      const urgencyLabel = taskDiv.querySelector('.slider-label:first-child');
      const importanceLabel = taskDiv.querySelector('.slider-label:last-child');
      if (urgencyLabel) urgencyLabel.textContent = `${t.urgency}:`;
      if (importanceLabel) importanceLabel.textContent = `${t.importance}:`;
      
      // Update slider value labels
      const urgencySlider = taskDiv.querySelector('input[type="range"]:first-child');
      const importanceSlider = taskDiv.querySelector('input[type="range"]:last-child');
      if (urgencySlider) {
        const urgencyValueLabel = urgencySlider.parentElement.querySelector('.slider-value-label');
        if (urgencyValueLabel) {
          let val = parseInt(urgencySlider.value);
          let desc = '';
          if (val >= 8) desc = t.sliderLabels.urgency[8];
          else if (val >= 5) desc = t.sliderLabels.urgency[5];
          else if (val >= 3) desc = t.sliderLabels.urgency[3];
          else desc = t.sliderLabels.urgency[1];
          urgencyValueLabel.innerHTML = `<span style="font-weight:${val >= 8 ? 800 : val >= 5 ? 600 : val >= 3 ? 500 : 400}">${val}</span><span style="font-weight:${val >= 8 ? 800 : val >= 5 ? 600 : val >= 3 ? 500 : 400};font-size:0.98em;margin-left:0.5em">${desc}</span>`;
        }
      }
      if (importanceSlider) {
        const importanceValueLabel = importanceSlider.parentElement.querySelector('.slider-value-label');
        if (importanceValueLabel) {
          let val = parseInt(importanceSlider.value);
          let desc = '';
          if (val >= 8) desc = t.sliderLabels.importance[8];
          else if (val >= 5) desc = t.sliderLabels.importance[5];
          else if (val >= 3) desc = t.sliderLabels.importance[3];
          else desc = t.sliderLabels.importance[1];
          importanceValueLabel.innerHTML = `<span style="font-weight:${val >= 8 ? 800 : val >= 5 ? 600 : val >= 3 ? 500 : 400}">${val}</span><span style="font-weight:${val >= 8 ? 800 : val >= 5 ? 600 : val >= 3 ? 500 : 400};font-size:0.98em;margin-left:0.5em">${desc}</span>`;
        }
      }
    });
    
    // Update priority list
    updatePriorityList();
    
    // Update matrix
    updateMatrix();
    
    // Update clear all button text
    const clearAllBtn = document.querySelector('.btn-main[style*="marginTop"]');
    if (clearAllBtn) {
      clearAllBtn.textContent = translations[langSelect.value].clearAllBtn;
    }
    
    // Update intro text
    document.querySelector('.intro h1').textContent = translations[langSelect.value].mainTitle;
    document.querySelector('.intro p').textContent = translations[langSelect.value].mainDesc;
    document.querySelector('.task-list h2').textContent = translations[langSelect.value].taskListTitle;
    document.querySelector('.priority-list h2').textContent = translations[langSelect.value].priorityTitle;
    document.querySelector('.matrix-container h2').textContent = translations[langSelect.value].graphTitle;
    
    // Save preferences
    saveUserPreferences();
  });
});

// Custom dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  const customSelect = document.querySelector('.custom-select');
  const selectedOption = customSelect.querySelector('.selected-option');
  const options = customSelect.querySelectorAll('.option');
  const langSelect = document.getElementById('langSelect');

  selectedOption.addEventListener('click', function() {
    customSelect.classList.toggle('active');
  });

  options.forEach(option => {
    option.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      const text = this.querySelector('span').textContent;
      const flag = this.querySelector('img').src;
      
      // Update selected option
      selectedOption.querySelector('span').textContent = text;
      selectedOption.querySelector('img').src = flag;
      
      // Update hidden select
      langSelect.value = value;
      
      // Trigger change event
      const event = new Event('change');
      langSelect.dispatchEvent(event);
      
      // Close dropdown
      customSelect.classList.remove('active');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove('active');
    }
  });
});

// Bölgeyi x ve y'ye göre döndüren fonksiyon
function getRegionByXY(x, y) {
  if (x >= -5 && x <= 0 && y >= 0 && y <= 5) return '1'; // Şimdi Yap
  if (x > 0 && x <= 5 && y >= 0 && y <= 5) return '2';   // Planla
  if (x >= -5 && x <= 0 && y >= -5 && y < 0) return '3'; // Delege Et
  if (x > 0 && x <= 5 && y >= -5 && y < 0) return '4';   // Sil
  return null;
}

function addTaskCardToUI(task, index) {
  const div = document.createElement('div');
  div.className = 'task';
  const titleRow = document.createElement('div');
  titleRow.className = 'title-row';
  const t = translations[langSelect.value];
  const isDark = document.body.classList.contains('dark');
  const editIcon = isDark ? 'images/icons/pen-dark mode.ico' : 'images/icons/pen-light-mode.ico';
  const trashIcon = isDark ? 'images/icons/trash-can-dark-mode.ico' : 'images/icons/trash-can-light-mode.ico';
  const strong = document.createElement('strong');
  strong.innerHTML = `${task.title} <button class="edit-btn" title="${t.editTask}"><img src="${editIcon}" alt="edit"></button>`;
  const trashBtn = document.createElement('button');
  trashBtn.className = 'trash-btn';
  trashBtn.title = 'Delete';
  trashBtn.innerHTML = `<img src="${trashIcon}" alt="delete">`;
  titleRow.appendChild(strong);
  titleRow.appendChild(trashBtn);

  // x ve y hesapla
  const x = task.urgency - 5;
  const y = task.importance - 5;
  const region = getRegionByXY(x, y);
  const regionLabel = document.createElement('span');
  regionLabel.className = 'task-region-label';
  regionLabel.textContent = t.regionExplanations[region];
  regionLabel.style.float = 'right';
  regionLabel.style.fontWeight = 'bold';
  regionLabel.style.marginLeft = 'auto';
  regionLabel.style.marginRight = '0.5em';
  regionLabel.style.color = isDark ? '#fff' : '#234';
  titleRow.appendChild(regionLabel);

  div.appendChild(titleRow);
  div.appendChild(createSlider(task, 'urgency', index));
  div.appendChild(createSlider(task, 'importance', index));
  document.getElementById('tasks').appendChild(div);
  // Eventler
  const editBtn = strong.querySelector('.edit-btn');
  editBtn.onclick = createEditHandler(task, div, t, editIcon);
  trashBtn.onclick = function() {
    showCustomAlert(t.deleteConfirm, () => {
      const idx = tasks.indexOf(task);
      if (idx > -1) {
        tasks.splice(idx, 1);
        div.remove();
        updateMatrix();
        updatePriorityList();
        saveUserPreferences();
        updateClearAllButtonVisibility();
      }
    });
  };
  div.onmouseenter = () => { window._highlightedTask = index; updateMatrix(); };
  div.onmouseleave = () => { window._highlightedTask = null; updateMatrix(); };
}
