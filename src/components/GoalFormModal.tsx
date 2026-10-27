import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { StudyGoal, GoalFormData, GoalStatus } from '../types/goal';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: GoalFormData) => void;
  initialGoal?: StudyGoal | null;
}

export const GoalFormModal: React.FC<GoalFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialGoal,
}) => {
  const isEditing = Boolean(initialGoal);

  // Default date = 7 days ahead for new goals
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState(getDefaultDate());
  const [status, setStatus] = useState<GoalStatus>('nao_iniciado');
  const [errors, setErrors] = useState<{ titulo?: string; prazo?: string }>({});

  useEffect(() => {
    if (initialGoal) {
      setTitulo(initialGoal.titulo);
      setDescricao(initialGoal.descricao);
      setPrazo(initialGoal.prazo);
      setStatus(initialGoal.status);
    } else {
      setTitulo('');
      setDescricao('');
      setPrazo(getDefaultDate());
      setStatus('nao_iniciado');
    }
    setErrors({});
  }, [initialGoal, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: { titulo?: string; prazo?: string } = {};

    if (!titulo.trim()) {
      newErrors.titulo = 'O título do objetivo é obrigatório.';
    } else if (titulo.trim().length < 3) {
      newErrors.titulo = 'O título deve ter pelo menos 3 caracteres.';
    }

    if (!prazo) {
      newErrors.prazo = 'Por favor, selecione uma data limite.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      prazo,
      status,
    });
  };

  // Helper para adicionar dias à data
  const handleAddDaysToDeadline = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setPrazo(d.toISOString().split('T')[0]);
    if (errors.prazo) {
      setErrors((prev) => ({ ...prev, prazo: undefined }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-slate-900">
              {isEditing ? 'Editar Objetivo de Estudo' : 'Novo Objetivo de Estudo'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? 'Atualize os detalhes do seu objetivo de aprendizado.'
                : 'Defina o que você quer aprender de forma clara e focada.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Campo Título */}
          <div>
            <label
              htmlFor="goal-title"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Título do Objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              id="goal-title"
              type="text"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value);
                if (errors.titulo) setErrors((prev) => ({ ...prev, titulo: undefined }));
              }}
              placeholder="Ex: Aprender a criar funções em JavaScript"
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                errors.titulo
                  ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                  : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
              }`}
              autoFocus
            />
            {errors.titulo && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.titulo}</span>
              </p>
            )}
          </div>

          {/* Campo Descrição */}
          <div>
            <label
              htmlFor="goal-description"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Descrição e Anotações
            </label>
            <textarea
              id="goal-description"
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o que você precisa fazer, tópicos essenciais ou o material que vai consultar..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
            />
            <p className="mt-1 text-xs text-slate-400">
              Dica: Seja específico e defina pequenas etapas práticas.
            </p>
          </div>

          {/* Campo Prazo */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="goal-deadline"
                className="text-xs font-semibold text-slate-700"
              >
                Data Limite (Prazo) <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Atalhos:</span>
                <button
                  type="button"
                  onClick={() => handleAddDaysToDeadline(3)}
                  className="text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
                >
                  +3 dias
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => handleAddDaysToDeadline(7)}
                  className="text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
                >
                  +1 semana
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => handleAddDaysToDeadline(15)}
                  className="text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
                >
                  +15 dias
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                id="goal-deadline"
                type="date"
                value={prazo}
                onChange={(e) => {
                  setPrazo(e.target.value);
                  if (errors.prazo) setErrors((prev) => ({ ...prev, prazo: undefined }));
                }}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none transition-colors ${
                  errors.prazo
                    ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                    : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                }`}
              />
            </div>
            {errors.prazo && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.prazo}</span>
              </p>
            )}
          </div>

          {/* Campo Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Status Atual
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('nao_iniciado')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                  status === 'nao_iniciado'
                    ? 'border-amber-400 bg-amber-50 text-amber-800 font-semibold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Não iniciado
              </button>

              <button
                type="button"
                onClick={() => setStatus('em_andamento')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                  status === 'em_andamento'
                    ? 'border-sky-400 bg-sky-50 text-sky-800 font-semibold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Em andamento
              </button>

              <button
                type="button"
                onClick={() => setStatus('concluido')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                  status === 'concluido'
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Concluído
              </button>
            </div>
          </div>

          {/* Rodapé com botões de ação */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
