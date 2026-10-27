import React from 'react';
import { Calendar, Edit3, Trash2, CheckCircle2, PlayCircle, RotateCcw } from 'lucide-react';
import { StudyGoal, STATUS_LABELS, GoalStatus } from '../types/goal';
import { formatDateBr, getDeadlineInfo } from '../utils/date';

interface GoalCardProps {
  goal: StudyGoal;
  onEdit: (goal: StudyGoal) => void;
  onRequestDelete: (goal: StudyGoal) => void;
  onQuickStatusChange: (id: string, newStatus: GoalStatus) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onRequestDelete,
  onQuickStatusChange,
}) => {
  const isCompleted = goal.status === 'concluido';
  const deadlineInfo = getDeadlineInfo(goal.prazo, isCompleted);

  // Status visual indicator text & dots
  const getStatusDisplay = () => {
    switch (goal.status) {
      case 'concluido':
        return {
          label: STATUS_LABELS.concluido,
          colorClass: 'text-emerald-700',
          dotClass: 'bg-emerald-600',
        };
      case 'em_andamento':
        return {
          label: STATUS_LABELS.em_andamento,
          colorClass: 'text-sky-700',
          dotClass: 'bg-sky-600',
        };
      case 'nao_iniciado':
      default:
        return {
          label: STATUS_LABELS.nao_iniciado,
          colorClass: 'text-amber-700',
          dotClass: 'bg-amber-600',
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  const getDeadlineColorClass = () => {
    if (isCompleted) return 'text-slate-500';
    if (deadlineInfo.status === 'atrasado') return 'text-rose-600 font-medium';
    if (deadlineInfo.status === 'hoje') return 'text-amber-700 font-medium';
    return 'text-slate-600';
  };

  return (
    <div
      className={`group relative bg-white rounded-xl border transition-all duration-200 p-5 flex flex-col justify-between ${
        isCompleted
          ? 'border-slate-200 bg-slate-50/40 opacity-90'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div>
        {/* Metadados superiores desempacotados (zero-pill discipline) */}
        <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${statusDisplay.dotClass}`}
              aria-hidden="true"
            />
            <span className={`font-semibold tracking-wide ${statusDisplay.colorClass}`}>
              {statusDisplay.label}
            </span>
          </div>

          {/* Atalho de avanço rápido de status */}
          <div className="flex items-center gap-1">
            {goal.status === 'nao_iniciado' && (
              <button
                type="button"
                onClick={() => onQuickStatusChange(goal.id, 'em_andamento')}
                className="text-xs text-sky-700 hover:text-sky-800 font-medium px-2 py-0.5 rounded hover:bg-sky-50 transition-colors flex items-center gap-1 cursor-pointer"
                title="Iniciar estudo"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Começar</span>
              </button>
            )}

            {goal.status === 'em_andamento' && (
              <button
                type="button"
                onClick={() => onQuickStatusChange(goal.id, 'concluido')}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-medium px-2 py-0.5 rounded hover:bg-emerald-50 transition-colors flex items-center gap-1 cursor-pointer"
                title="Marcar como concluído"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Concluir</span>
              </button>
            )}

            {goal.status === 'concluido' && (
              <button
                type="button"
                onClick={() => onQuickStatusChange(goal.id, 'em_andamento')}
                className="text-xs text-slate-600 hover:text-slate-800 font-medium px-2 py-0.5 rounded hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                title="Reabrir meta para revisão"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reabrir</span>
              </button>
            )}
          </div>
        </div>

        {/* Título do Objetivo */}
        <h3
          className={`text-base font-semibold leading-snug break-words ${
            isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
          }`}
        >
          {goal.titulo}
        </h3>

        {/* Descrição */}
        <p
          className={`mt-2 text-sm leading-relaxed whitespace-pre-line break-words ${
            isCompleted ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {goal.descricao || 'Nenhuma descrição fornecida.'}
        </p>
      </div>

      {/* Rodapé do cartão: Prazo e Ações */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        {/* Informações de prazo */}
        <div className="flex items-center gap-1.5 text-slate-500 min-w-0">
          <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-mono tabular-nums text-slate-700">
              {formatDateBr(goal.prazo)}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className={`truncate ${getDeadlineColorClass()}`}>
              {deadlineInfo.label}
            </span>
          </div>
        </div>

        {/* Botões de Ação: Editar e Excluir */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(goal)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Editar informações do objetivo"
            aria-label={`Editar objetivo ${goal.titulo}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onRequestDelete(goal)}
            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Excluir este objetivo"
            aria-label={`Excluir objetivo ${goal.titulo}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
