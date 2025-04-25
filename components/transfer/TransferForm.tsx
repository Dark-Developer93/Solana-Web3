'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTransferContext } from '@/contexts/TransferContext';
import { TransferFormValues, createTransferFormSchema } from '@/schemas/transfer-form';

export const TransferForm: React.FC = () => {
  const {
    balance: maxAmount,
    isLoading,
    getUsdValue,
    isLoadingPrice: isPriceLoading,
    formValues: defaultValues,
    isSubmitSuccessful,
    handleValuesChange: onValuesChange,
    handleFormSubmit: onSubmit,
  } = useTransferContext();

  const formSchema = createTransferFormSchema(maxAmount);

  const form = useForm<TransferFormValues>({
    defaultValues: defaultValues || {
      recipient: '',
      amount: '',
    },
    mode: 'onChange',
    // @ts-expect-error - Type instantiation is excessively deep and possibly infinite with the dynamic schema creation
    resolver: zodResolver(formSchema),
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      form.reset(defaultValues);
    }
  }, [isSubmitSuccessful, form, defaultValues]);

  React.useEffect(() => {
    const subscription = form.watch(formValues => {
      if (formValues.recipient || formValues.amount) {
        onValuesChange(form.getValues() as TransferFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onValuesChange]);

  const renderUsdValue = (amount: string) => {
    if (!amount || isNaN(Number.parseFloat(amount))) return undefined;

    const usdValue = getUsdValue(Number.parseFloat(amount));

    if (!usdValue) return undefined;

    return (
      <Badge variant="outline" className="text-xs flex items-center gap-1">
        {isPriceLoading && <Loader2 className="h-3 w-3 animate-spin" />}≈ {usdValue} USD
      </Badge>
    );
  };

  const handleSubmit = (values: TransferFormValues) => {
    if (isLoading) return;
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="recipient"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Recipient Address</FormLabel>
                {field.value && !form.formState.errors.recipient && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Valid
                  </Badge>
                )}
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter Solana address"
                    autoComplete="off"
                    disabled={isLoading}
                    {...field}
                    className={`${fieldState.error ? 'border border-red-500' : ''} ${isLoading ? 'opacity-70' : ''}`}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Amount (SOL)</FormLabel>
                {renderUsdValue(field.value)}
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="0.0"
                    disabled={isLoading}
                    {...field}
                    onChange={e => {
                      const value = e.target.value;
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        field.onChange(value);
                      }
                    }}
                    className={`${fieldState.error ? 'border border-red-500' : ''} ${isLoading ? 'opacity-70' : ''}`}
                    type="number"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
              {maxAmount !== undefined && maxAmount > 0 && (
                <div className="text-xs text-muted-foreground">
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => field.onChange(maxAmount.toString())}
                    disabled={isLoading}
                  >
                    Max: {maxAmount.toFixed(4)} SOL
                  </button>
                </div>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
