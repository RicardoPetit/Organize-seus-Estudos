import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { StudyGoal } from '../types/goal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  goal: StudyGoal | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  goal,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen || !goal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4">
            <h3 id="delete-dialog-title" className="text-base font-bold text-slate-900">
              Confirmar exclusão de objetivo
            </h3>
            <p id="delete-dialog-desc" className="text-xs leading-relaxed text-slate-600 mt-2">
              Tem certeza de que deseja excluir o objetivo abaixo? Esta ação removerá os dados do navegador permanentemente.
            </p>

            <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-semibold text-slate-900 block truncate">
                {goal.titulo}
              </span>
              {goal.descricao && (
                <span className="text-slate-500 line-clamp-2 mt-0.5 block">
                  {goal.descricao}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Sim, excluir objetivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
