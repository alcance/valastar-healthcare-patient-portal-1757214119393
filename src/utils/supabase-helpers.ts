// src/utils/supabase-helpers.ts
import { createClient } from '@/lib/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

// Clean, properly typed client function
const createClientFn = (): SupabaseClient => createClient();

/**
 * Fetch data with error handling and type safety
 */
export async function fetchData(
  tableName: string,
  options?: { 
    columns?: string;
    filter?: Record<string, any>;
    limit?: number;
    order?: { column: string; ascending?: boolean };
  }
): Promise<any[]> {
  try {
    const supabase = createClientFn();
    
    let query = supabase
      .from(tableName)
      .select(options?.columns || '*');
    
    // Apply filters if provided
    if (options?.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    // Apply ordering if provided
    if (options?.order) {
      const { column, ascending = true } = options.order;
      query = query.order(column, { ascending });
    }
    
    // Apply limit if provided
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error in fetchData for ${tableName}:`, error);
    return [];
  }
}

/**
 * Insert data with error handling and type safety
 */
export async function insertData(
  tableName: string,
  data: Record<string, any>
): Promise<any | null> {
  try {
    const supabase = createClientFn();
    
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .select()
      .single();
    
    if (error) {
      console.error(`Error inserting into ${tableName}:`, error);
      return null;
    }
    
    return result;
  } catch (error) {
    console.error(`Error in insertData for ${tableName}:`, error);
    return null;
  }
}

/**
 * Update data with error handling and type safety
 */
export async function updateData(
  tableName: string,
  id: string | number,
  data: Record<string, any>
): Promise<any | null> {
  try {
    const supabase = createClientFn();
    
    const { data: result, error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating ${tableName}:`, error);
      return null;
    }
    
    return result;
  } catch (error) {
    console.error(`Error in updateData for ${tableName}:`, error);
    return null;
  }
}

/**
 * Delete data with error handling
 */
export async function deleteData(
  tableName: string,
  id: string | number
): Promise<boolean> {
  try {
    const supabase = createClientFn();
    
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error in deleteData for ${tableName}:`, error);
    return false;
  }
}

/**
 * Execute a custom query with error handling
 */
export async function executeQuery(
  queryBuilder: (client: SupabaseClient) => any
): Promise<any> {
  try {
    const supabase = createClientFn();
    const result = await queryBuilder(supabase);
    return result;
  } catch (error) {
    console.error('Error executing custom query:', error);
    return { data: null, error };
  }
}

/**
 * Check if a record exists
 */
export async function recordExists(
  tableName: string,
  field: string,
  value: any
): Promise<boolean> {
  try {
    const supabase = createClientFn();
    
    const { data, error } = await supabase
      .from(tableName)
      .select('id')
      .eq(field, value)
      .limit(1);
    
    if (error) {
      console.error(`Error checking if record exists in ${tableName}:`, error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error(`Error in recordExists for ${tableName}:`, error);
    return false;
  }
}

/**
 * Get record count for a table
 */
export async function getRecordCount(
  tableName: string,
  filter?: Record<string, any>
): Promise<number> {
  try {
    const supabase = createClientFn();
    
    let query = supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    // Apply filters if provided
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    const { count, error } = await query;
    
    if (error) {
      console.error(`Error getting record count for ${tableName}:`, error);
      return 0;
    }
    
    return count || 0;
  } catch (error) {
    console.error(`Error in getRecordCount for ${tableName}:`, error);
    return 0;
  }
}